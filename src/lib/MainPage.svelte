<script lang="ts">
    import {currentUser, pb} from "./PocketBase";
    import type {LegoSet} from "./DataStructures";
    import {mapLegoSetToPocketBase, mapPocketBaseToLegoSet} from "./DataStructures";
    import {faAdd} from "@fortawesome/free-solid-svg-icons";
    import {Icon} from "svelte-fontawesome/main";
    import { toast } from '@zerodevx/svelte-toast'
    import {onMount} from "svelte";
    import {writable} from "svelte/store";
    import RebrickableApi from "./RebrickableAPI";
    import LegoSetView from "./LegoSetView.svelte";
    import {selectedSetId} from "./stores";

    // Initialize the Rebrickable API
    const rebrickable = new RebrickableApi(pb.authStore.model.rebrickable_api_key);

    // Get the initial sets from PocketBase
    const sets = writable<LegoSet[]>([]);

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
            toast.push("Keine Set-Nummer gegeben!", {theme: {"--toastBarBackground": "red"}});
            return;
        }

        // Get the data from the Rebrickable API
        let newSetData: LegoSet;
        try {
            newSetData = await rebrickable.getLegoSetData(newSetNumber);
        } catch (e) {
            // TODO: Add more precise error handling
            toast.push("Abrufen der LEGO-Daten fehlgeschlagen!", {theme: {"--toastBarBackground": "red"}});
            console.error("Abrufen der LEGO-Daten von der Rebrickable API fehlgeschlagen!", e);
            return;
        }

        // Get missing data
        newSetData.toSell = newSetToSell || false;
        newSetData.addedByUserName = pb.authStore.model.username;

        // Save the data into the collection
        let createResult;
        try {
            createResult = await pb.collection("lego_sets").create(await mapLegoSetToPocketBase(newSetData));
        } catch (e) {
            // TODO: Add more precise error handling
            toast.push("Eintragen der LEGO-Daten fehlgeschlagen!", {theme: {"--toastBarBackground": "red"}});
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
</script>

<aside>
    <section>
        <form on:submit|preventDefault>
            <input bind:value={newSetNumber} placeholder="Setnummer" type="text"/>
            <input bind:value={newSetToSell} type="checkbox"/>
            <label>Verkaufen</label>
            <button on:click={addSet}><Icon icon={faAdd}/></button>
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
    <h1>My App</h1>
</main>

<style lang="scss">
  @import "vars";

  aside {
    height: 100%;
    width: $sidebar-width;

    background-color: $base-color;
    padding: 20px;
  }

  .sets-list {
    overflow: auto;
    height: calc(100vh - 120px);
  }

  .logout {
    font-size: 14px;

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
    padding: 1em;
    background-color: $base-color-alt1;
  }
</style>
