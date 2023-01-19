<script lang="ts">
    import {currentUser, pb} from "./PocketBase";
    import type {LegoPart, LegoSet} from "./DataStructures";
    import {mapLegoSetToPocketBase, mapPocketBaseToLegoSet} from "./DataStructures";
    import {faAdd} from "@fortawesome/free-solid-svg-icons";
    import {Icon} from "svelte-fontawesome/main";
    import {onMount} from "svelte";
    import RebrickableApi from "./RebrickableAPI";
    import LegoSetView from "./LegoSetView.svelte";
    import {selectedSetId, sets} from "./stores";
    import toast from "./toasts";

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
            toast.pushError("Keine Set-Nummer gegeben!");
            return;
        }

        // Get the data from the Rebrickable API
        let newSetData: LegoSet;
        try {
            newSetData = await rebrickable.getLegoSetData(newSetNumber);
        } catch (e) {
            // TODO: Add more precise error handling
            toast.pushError("Abrufen der LEGO-Daten fehlgeschlagen!");
            console.error("Abrufen der LEGO-Daten von der Rebrickable API fehlgeschlagen!", e);
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
            toast.pushError("Eintragen der LEGO-Daten fehlgeschlagen!");
            console.error("Eintragen der LEGO-Daten in PocketBase fehlgeschlagen!", e);
            return;
        }

        // Get the ID and save the data to the store
        newSetData.id = createResult.id;
        sets.update(oldSets => [...oldSets, newSetData]);

        // Set the default values for the inputs
        newSetNumber = undefined;
        newSetToSell = false;
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

        // Compare the part number
        if (a.partNumber > b.partNumber) return 1;
        if (a.partNumber < b.partNumber) return -1;
        return 0;
    }
</script>

<aside>
    <section>
        <form on:submit|preventDefault>
            <input bind:value={newSetNumber} placeholder="Setnummer" type="text"/>
            <input bind:value={newSetToSell} type="checkbox"/>
            <label>Verkaufen</label>
            <button on:click={addSet}>
                <Icon icon={faAdd}/>
            </button>
        </form>
        <div class="sets-list">
            {#if $sets.length > 0}
                {#each $sets as set}
                    <LegoSetView set={set}/>
                {/each}
            {:else}
                <span>Keine Sets gefunden</span>
            {/if}
        </div>

        <span class="logout">Angemeldet als {$currentUser.username}. <a on:click={logout}>Abmelden</a></span>
    </section>
</aside>

<main>
    <div class="parts-list">
        {#if $selectedSetId}
            {#each $sets.filter(x => x.id === $selectedSetId)[0].parts.sort((a, b) => compareLegoParts(a, b)) as part}
                <p>{part.partName}</p>
            {/each}
        {:else}
            <span>Set auswählen!</span>
        {/if}
    </div>
</main>

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

  .logout {
    font-size: $sm-font-size;

    a {
      text-decoration: underline;

      &:hover {
        cursor: pointer;
        color: $highlight-color;
      }
    }
  }

  main {
    width: calc(100vw - $sidebar-width);
    background-color: $base-color-alt1;
  }

  .parts-list {
    padding: $base-spacing;
    height: 100vh;
    overflow: auto;
  }
</style>
