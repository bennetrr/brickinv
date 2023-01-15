<script lang="ts">
    import {currentUser, pb} from "./PocketBase";
    import type {LegoSet, LegoPart} from "./DataStructures";

    sets_

    let sets: LegoSet[];

    function logout() {
        pb.authStore.clear();
    }
</script>

<aside>
    <section>
        <h1>Sets</h1>
        <div class="sets-list">
            {#each sets as set}
                <div class="set">
                    <span>{set.name}</span>
                </div>
            {/each}
        </div>
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
