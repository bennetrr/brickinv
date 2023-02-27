<script lang="ts">
    import {onDestroy, onMount} from "svelte";

    import {currentUser, pb} from "../connectors/PocketBase";
    import type {
        LegoPartsRecord,
        LegoPartsResponse,
        LegoSetsRecord,
        LegoSetsResponse,
        UsersResponse
    } from "../interfaces/PocketBaseTypes";
    import {Collections} from "../interfaces/PocketBaseTypes";
    import RebrickableApi from "../connectors/RebrickableAPI";
    import {addNotification} from "../stores/NotificationStore";
    import {openedSet, sets} from "../stores/SetStores";

    import {ActionIcon, Checkbox, Group, SimpleGrid, Space, TextInput} from "@svelteuidev/core";
    import {Icon} from "svelte-fontawesome/main";
    import {faAdd, faLock} from "@fortawesome/free-solid-svg-icons";

    import LegoSetView from "./LegoSet.svelte";
    import LegoPartList from "./LegoPartsPage.svelte";

    // Initialize the Rebrickable API
    const rebrickable = new RebrickableApi($currentUser.rebrickable_api_key);

    onMount(async () => {
        // Get initial sets
        $sets = await pb.collection(Collections.LegoSets).getFullList<LegoSetsResponse<{ added_by_user: UsersResponse }>>(200, {expand: "added_by_user"});

        // Subscribe to realtime changes
        await pb.collection(Collections.LegoSets).subscribe<LegoSetsResponse<{ added_by_user: UsersResponse }>>("*", async ({action, record}) => {
            switch (action) {
                case "create":
                    // Get the new record from pocketbase,
                    // because the record from the subscription
                    // does not have the user field expanded
                    const newSet = await pb.collection(Collections.LegoSets).getOne<LegoSetsResponse<{ added_by_user: UsersResponse }>>(record.id, {expand: "added_by_user"});
                    $sets = [...$sets, newSet];
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

    //#region Add a set to the list
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
        };

        // Clear the inputs
        newSetNumber = undefined;
        newSetToSell = false;

        // Add the new set to the collection
        const {id: newSetId} = await pb.collection(Collections.LegoSets).create<LegoSetsResponse>(newSetData);

        // Fill in missing data for the parts and add the parts to the collection
        for (const x of newSetParts) {
            x.set = newSetId;
            x.present_count = 0;
            await pb.collection(Collections.LegoParts).create <LegoPartsResponse>(x);
        }

        // Disable the loader icon
        newSetActionRunning = false;
    }
    //#endregion
</script>

<div class="add-set">
    <Group>
        <TextInput bind:value={newSetNumber} placeholder="Set-Nummer" variant="filled"/>
        <Checkbox bind:checked={newSetToSell} color="teal" label="Verkaufen"/>
        <Space/>
        <ActionIcon loading={newSetActionRunning} on:click={addSet} size="xl" variant="filled" color="teal">
            <Icon icon={faAdd}/>
        </ActionIcon>
    </Group>
</div>

<div class="bar"></div>

<div class="sets-list">
    {#if $sets.length > 0}
        {#each $sets as set}
            <LegoSetView set={set}/>
        {/each}
    {:else}
        <span>Keine Sets gefunden</span>
    {/if}
</div>

<style lang="scss">
    @import "../vars";

    .add-set {
      width: fit-content;
      margin: $base-spacing;
      padding: $base-spacing;

      background-color: $base-color;
      border: $base-border;
      border-radius: $card-border-radius;
    }

    .bar {
      width: 100%;
      border-top: $base-border;
    }

    .sets-list {
      width: 100%;
      height: calc(100% - (44px + (4 * $base-spacing)));
      padding: $base-spacing;
      overflow-y: auto;

      display: grid;
      gap: $base-spacing;
      grid-template-columns: repeat(1, 1fr);
      
      @media screen and (min-width: 1300px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }
</style>