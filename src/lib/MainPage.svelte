<script lang="ts">
    import {currentUser, pb} from "./PocketBase";
    import type {LegoPart, LegoSet} from "./DataStructures";
    import {mapLegoSetToPocketBase, mapPocketBaseToLegoSet} from "./DataStructures";
    import {faAdd, faLock} from "@fortawesome/free-solid-svg-icons";
    import {Icon} from "svelte-fontawesome/main";
    import {onMount} from "svelte";
    import RebrickableApi from "./RebrickableAPI";
    import LegoSetView from "./LegoSetView.svelte";
    import {addSetActionRunning, selectedSetId, sets} from "./stores";
    import LegoPartView from "./LegoPartView.svelte";
    import {ActionIcon, Checkbox, Group, Space, TextInput} from "@svelteuidev/core";
    import {debug} from "svelte/internal";

    // Initialize the Rebrickable API
    //@ts-ignore
    const rebrickable = new RebrickableApi(pb.authStore.model.rebrickable_api_key);

    // Get the initial sets from PocketBase
    onMount(async () => {
        const newSets: LegoSet[] = [];
        const resultList = await pb.collection("lego_sets").getFullList();

        for (const result of resultList) {
            const data = await mapPocketBaseToLegoSet(result);
            newSets.push(data);
        }
        sets.set(newSets);
    });

    // Add a set to the list
    let newSetNumber: string;
    let newSetToSell: boolean;

    async function addSet() {
        if (newSetNumber === "" || newSetNumber === undefined) {
            //toast.pushError("Keine Set-Nummer gegeben!");
            console.error("Keine Set-Nummer angegeben!");
            return;
        }

        addSetActionRunning.set(true);

        // Get the data from the Rebrickable API
        let newSetData: LegoSet;
        try {
            newSetData = await rebrickable.getLegoSetData(newSetNumber);
        } catch (e) {
            // TODO: Add more precise error handling
            // toast.pushError("Abrufen der LEGO-Daten fehlgeschlagen!");
            console.error("Abrufen der LEGO-Daten von der Rebrickable API fehlgeschlagen!", e);
            addSetActionRunning.set(false);
            return;
        }

        // Get missing data
        newSetData.toSell = newSetToSell || false;
        //@ts-ignore
        newSetData.addedByUserName = pb.authStore.model.username;

        // Save the data into the collection
        let createResult;
        try {
            createResult = await pb.collection("lego_sets").create(await mapLegoSetToPocketBase(newSetData));
        } catch (e) {
            // TODO: Add more precise error handling
            // toast.pushError("Eintragen der LEGO-Daten fehlgeschlagen!");
            console.error("Eintragen der LEGO-Daten in PocketBase fehlgeschlagen!", e);
            addSetActionRunning.set(false);
            return;
        }

        // Get the ID and save the data to the store
        newSetData.id = createResult.id;
        sets.update(oldSets => [...oldSets, newSetData]);

        // Set the default values for the inputs
        newSetNumber = undefined;
        newSetToSell = false;
        addSetActionRunning.set(false);
    }

    function logout() {
        pb.authStore.clear();
    }

    function compareLegoParts(a: LegoPart, b: LegoPart): 1 | 0 | -1 {
        // If one is already complete, it's "smaller"
        const aComplete = a.partCount === a.presentPartCount;
        const bComplete = b.partCount === b.presentPartCount;

        if (aComplete && !bComplete) return 1;
        if (!aComplete && bComplete) return -1;

        // Put minifigs to the top
        const aMinifig = a.partNumber.startsWith("fig");
        const bMinifig = b.partNumber.startsWith("fig");

        if (aMinifig && !bMinifig) return -1;
        if (!aMinifig && bMinifig) return 1;

        // Compare the part number
        if (a.partNumber > b.partNumber) return 1;
        if (a.partNumber < b.partNumber) return -1;
        return 0;
    }

    async function onPartCountChanged(partNumber: string, newCount: number) {
        const changedSetIndex = $sets.findIndex(x => x.id === $selectedSetId);
        const changedPartIndex = $sets[changedSetIndex].parts.findIndex(x => x.partNumber === partNumber);

        $sets[changedSetIndex].parts[changedPartIndex].presentPartCount = newCount;

        const mappedLegoSet = await mapLegoSetToPocketBase($sets[changedSetIndex]);
        try {
            console.dir(await pb.collection("lego_sets").update($selectedSetId, mappedLegoSet));
        } catch (e) {
            console.error("Fehler beim schreiben in die Datenbank!", e);
        }

        sets.update(sets => sets);
    }
</script>

<aside>
    <Group>
        <TextInput bind:value={newSetNumber} placeholder="Set-Nummer" variant="filled"/>
        <Checkbox bind:checked={newSetToSell} color="teal" label="Verkaufen"/>
        <Space w={68}/>
        <ActionIcon loading={$addSetActionRunning} on:click={addSet} size="xl" variant="outline">
            <Icon icon={faAdd}/>
        </ActionIcon>
    </Group>
    <div class="sets-list">
        {#if $sets.length > 0}
            {#each $sets as set}
                <LegoSetView set={set}/>
            {/each}
        {:else}
            <span>Keine Sets gefunden</span>
        {/if}
    </div>
</aside>

<main>
    <div class="parts-list">
        {#if $selectedSetId}
            {#each $sets.filter(x => x.id === $selectedSetId)[0].parts.sort((a, b) => compareLegoParts(a, b)) as part}
                <LegoPartView part={part} partCountChanged={onPartCountChanged}/>
            {/each}
        {:else}
            <span>Set auswählen!</span>
        {/if}
    </div>
</main>

<div class="logout-button">
    <ActionIcon on:click={logout} size="xl" variant="outline">
        <Icon icon={faLock}/>
    </ActionIcon>
</div>

<style lang="scss">
  @import "vars";

  aside {
    height: 100%;
    width: $sidebar-width;

    background-color: $base-color;
    padding: $base-spacing;
  }

  .sets-list {
    overflow: auto;
    height: calc(100vh - 120px); // TODO: FIX
  }

  main {
    width: calc(100vw - $sidebar-width);
    background-color: $base-color-alt1;
    border-left: $base-border;
  }

  .parts-list {
    padding: $base-spacing;
    height: 100vh;
    overflow: auto;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $base-spacing;
  }

  .logout-button {
    position: absolute;
    bottom: 15px;
    left: 15px;
  }
</style>
