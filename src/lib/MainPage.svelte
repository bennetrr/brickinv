<script lang="ts">
    import {currentUser, pb} from "./PocketBase";
    import type {LegoSet, LegoPart} from "./DataStructures";

    import { faAdd } from '@fortawesome/free-solid-svg-icons';
    import {Icon} from 'svelte-fontawesome/main'
    import axios from "axios";

    // Get the initial sets from PocketBase
    let sets: LegoSet[] = [];

    // Add a set to the list
    let newSetNumber: string;

    function addSet() {
        // Get the data from the rebrickable API


        pb
            .collection("lego_sets")
            .create({

            })
    }

    function logout() {
        pb.authStore.clear();
    }
</script>

<aside>
    <section>
        <h1>Sets</h1>
        <div class="sets-list">
            {#if sets.length > 0}
                {#each sets as set}
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
            <button on:click={addSet}><Icon icon={faAdd}/></button>
        </form>
        <span class="logout">Angemeldet als {$currentUser.username}. <a on:click={logout}>Abmelden</a></span>
    </section>
</aside>

<main>
    <h1>My App</h1>
</main>

<style lang="scss">
    @import "../vars";
    aside {
        height: 100%;
        width: 300px;

        background-color: #eeeeee;
        padding: 20px;
    }

    .sets-list {
        overflow: auto;
        height: calc(100vh - 70px);
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
