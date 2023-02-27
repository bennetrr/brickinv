<script lang="ts">
    import {pb} from "../connectors/PocketBase";
    import {openedSet} from "../stores/SetStores";

    import {ActionIcon} from "@svelteuidev/core";
    import {Icon} from "svelte-fontawesome/main";
    import {faArrowLeft, faLock} from "@fortawesome/free-solid-svg-icons";

    import LegoSetsPage from "./LegoSetsPage.svelte";
    import LegoPartsPage from "./LegoPartsPage.svelte";

    function logout() {
        pb.authStore.clear();
    }

    function closeSet() {
        $openedSet = null;
    }
</script>

<aside>
    {#if $openedSet !== null}
        <div class="back-button">
            <ActionIcon on:click={closeSet} size="xl" variant="filled" color="red">
                <Icon icon={faArrowLeft}/>
            </ActionIcon>
        </div>
    {/if}

    <div class="logout-button">
        <ActionIcon color="gray" on:click={logout} size="xl" variant="filled">
            <Icon icon={faLock}/>
        </ActionIcon>
    </div>
</aside>

<main>
    {#if $openedSet === null}
        <LegoSetsPage/>
    {:else}
        <LegoPartsPage/>
    {/if}
</main>

<style lang="scss">
  @import "../vars";

  aside {
    height: 100%;
    width: $sidebar-width;
    padding: $small-spacing;

    background-color: $base-color;
  }

  .logout-button {
    position: absolute;
    bottom: $small-spacing;
  }

  main {
    width: calc(100% - $sidebar-width);
    background-color: $base-color-alt1;
    border-left: $base-border;
  }
</style>
