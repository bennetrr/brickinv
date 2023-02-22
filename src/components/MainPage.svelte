<script lang="ts">
    import {onMount} from "svelte";

    import {ActionIcon, Checkbox, Group, Space, TextInput} from "@svelteuidev/core";
    import {Icon} from "svelte-fontawesome/main";
    import {faAdd, faLock} from "@fortawesome/free-solid-svg-icons";

    import {currentUser, pb} from "../connectors/PocketBase";
    import type {
        LegoPartsRecord,
        LegoPartsResponse,
        LegoSetsRecord,
        LegoSetsResponse,
        UsersResponse
    } from "../interfaces/PocketBaseTypes";
    import {Collections} from "../interfaces/PocketBaseTypes";
    import {addNotification} from "../stores/NotificationStore";
    import {sets} from "../stores/setStores";
    import RebrickableApi from "../connectors/RebrickableAPI";

    import {addSetActionRunning, selectedSetId} from "../stores/stores";

    import LegoSetView from "./LegoSetView.svelte";
    import LegoPartView from "./LegoPartView.svelte";

    // Initialize the Rebrickable API
    //@ts-ignore
    const rebrickable = new RebrickableApi($currentUser.rebrickable_api_key);

    onMount(async () => {
        // Get initial sets
        $sets = await pb.collection(Collections.LegoSets).getFullList<LegoSetsResponse<{UsersResponse}>>(200, {expand: "added_by_user"});

        // Subscribe to realtime changes
        await pb.collection(Collections.LegoSets).subscribe<LegoSetsResponse<{UsersResponse}>>("*", async ({action, record}) => {
            switch (action) {
                case "create":
                    $sets = [...$sets, record];
                    break;
                case "update":
                    const updateIndex = $sets.findIndex(x => x.id === record.id);
                    $sets.splice(updateIndex, 1, record);
                    $sets = $sets;
                    break;
                case "delete":
                    $sets.filter(x => x.id !== record.id);
                    $sets = $sets;
                    break;
            }
        });
    });

    // Add a set to the list
    let newSetNumber: string;
    let newSetToSell: boolean;
    let newSetActionRunning = false;

    async function addSet() {
        // Check if the set number textbox is empty
        if (newSetNumber === "" || newSetNumber === undefined) {
            addNotification({type: "error", text: "Keine Set-Nummer angegeben!", duration: 5});
            return;
        }

        // Activate the loader icon in the button
        newSetActionRunning = true;

        // Get the set data from Rebrickable
        let newSetData: LegoSetsRecord;
        let newSetParts: LegoPartsRecord[];

        try {
            newSetData = await rebrickable.getLegoSetInformation(newSetNumber);
            newSetParts = await rebrickable.getLegoSetParts(newSetNumber);
        } catch (e) {
            // TODO: Add more precise error handling
            addNotification({type: "error", text: "Abrufen der Set-Daten fehlgeschlagen!", duration: 10});
            console.error("Abrufen der LEGO-Daten von der Rebrickable API fehlgeschlagen!", e);
            newSetActionRunning = false;
            return;
        }

        // Fill in missing data for the set
        let totalParts = 0;
        newSetParts.forEach(x => totalParts += x.total_count);

        newSetData = {
            ...newSetData,
            added_by_user: $currentUser.id,
            to_sell: newSetToSell,
            present_parts: 0,
            total_parts: totalParts
        }

        // Add the new set to the collection
        const {id: newSetId} = await pb.collection(Collections.LegoSets).create<LegoSetsResponse>(newSetData);

        // Fill in missing data for the parts and add the parts to the collection
        newSetParts.forEach(x => {
            x.set = newSetId;
            x.present_count = 0;
            pb.collection(Collections.LegoParts).create<LegoPartsResponse>(x);
        });

        // Clear the inputs
        newSetNumber = undefined;
        newSetToSell = false;

        // Disable the loader icon
        newSetActionRunning = false;
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
        <ActionIcon loading={newSetActionRunning} on:click={addSet} size="xl" variant="outline">
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
  @import "../vars";

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
