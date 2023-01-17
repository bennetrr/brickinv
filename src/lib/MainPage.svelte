<script lang="ts">
    import {currentUser, pb} from "./PocketBase";
    import type {LegoSet} from "./DataStructures";
    import {mapLegoSetToPocketBase, mapPocketBaseToLegoSet} from "./DataStructures";
    import getLegoSetData from "./RebrickableAPI";
    import {writable} from "svelte/store";

    import {faAdd} from "@fortawesome/free-solid-svg-icons";
    import {Icon} from "svelte-fontawesome/main";
    import { toast } from '@zerodevx/svelte-toast'

    // Get the initial sets from PocketBase
    const sets = writable<LegoSet[]>([]);

    pb.collection("lego_sets")
        .getFullList()
        .then(res => {
            res.forEach(x => {
                mapPocketBaseToLegoSet(x).then(
                    y => sets.update(oldSets => [...oldSets, y])
                )
            })
        }
    )

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
            newSetData = await getLegoSetData(newSetNumber);
        } catch (e) {
            // TODO: Add more precise error handling
            toast.push("Abrufen der LEGO-Daten fehlgeschlagen!", {theme: {"--toastBarBackground": "red"}});
            return;
        }

        // Save the data into the collection
        const createResult = await pb.collection("lego_sets").create(mapLegoSetToPocketBase(newSetData));

        // Get the ID and save the data to the store
        newSetData.id = createResult.id;
        newSetData.toSell = newSetToSell;
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
        <h1>Sets</h1>
        <div class="sets-list">
            {#if $sets.length > 0}
                {#each $sets as set}
                    <div class="set">
                        <span>{set.name}</span>
                    </div>
                {/each}
            {:else}
                <span>Keine Sets gefunden</span>
            {/if}
        </div>
        <form on:submit|preventDefault>
            <input bind:value={newSetNumber} placeholder="Set hinzufügen" type="text"/>
            <button on:click={addSet}>
                <Icon icon={faAdd}/>
            </button>
            <br />
            <label>Zum Verkaufen</label>
            <input bind:value={newSetToSell} type="checkbox"/>
        </form>
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
    width: 300px;

    background-color: #eeeeee;
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
    margin-left: 300px;
    padding: 1em;
  }
</style>
