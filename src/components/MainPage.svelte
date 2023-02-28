<script lang="ts">
    import {onDestroy, onMount} from "svelte";

    import {pb} from "../connectors/PocketBase";
    import type {LegoSetsResponse, UsersResponse} from "../interfaces/PocketBaseTypes";
    import {Collections} from "../interfaces/PocketBaseTypes";
    import {openedSet, sets} from "../stores/SetStores";

    import {ActionIcon} from "@svelteuidev/core";
    import {Icon} from "svelte-fontawesome/main";
    import {faArrowLeft, faLock} from "@fortawesome/free-solid-svg-icons";
    import LegoSetsPage from "./LegoSetsPage.svelte";
    import LegoPartsPage from "./LegoPartsPage.svelte";

    onMount(async () => {
        // Get initial sets
        $sets = await pb
            .collection(Collections.LegoSets)
            .getFullList<LegoSetsResponse<{ added_by_user: UsersResponse }>>(200, {expand: "added_by_user"});

        console.log("");
        // Subscribe to realtime changes
        await pb
            .collection(Collections.LegoSets)
            .subscribe<LegoSetsResponse<{ added_by_user: UsersResponse }>>("*", async ({
                                                                                           action,
                                                                                           record
                                                                                       }) => {
                switch (action) {
                    case "create":
                        // Get the new record from pocketbase,
                        // because the record from the subscription
                        // does not have the user field expanded
                        const newSet = await pb.collection(Collections.LegoSets).getOne<LegoSetsResponse<{ added_by_user: UsersResponse }>>(record.id, {expand: "added_by_user"});
                        $sets = [
                            ...$sets,
                            newSet
                        ];
                        break;
                    case "update":
                        const updatedSet = await pb.collection(Collections.LegoSets).getOne<LegoSetsResponse<{ added_by_user: UsersResponse }>>(record.id, {expand: "added_by_user"});
                        const updateIndex = $sets.findIndex(x => x.id === record.id);
                        $sets.splice(updateIndex, 1, updatedSet);
                        $sets = $sets;
                        break;
                    case "delete":
                        $sets = $sets.filter(x => x.id !== record.id);
                        if ($openedSet === record.id) $openedSet = null;
                        break;
                }
            });
    });

    onDestroy(() => {
        pb.collection(Collections.LegoSets).unsubscribe();
    });

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
