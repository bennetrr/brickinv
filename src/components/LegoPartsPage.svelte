<script lang="ts">
    import {onDestroy, onMount} from "svelte";

    import {pb} from "../connectors/PocketBase.js";
    import type {LegoPartsResponse} from "../interfaces/PocketBaseTypes";
    import {Collections} from "../interfaces/PocketBaseTypes";
    import {openedSet, sets} from "../stores/SetStores.js";

    import {Loader, Stack} from "@svelteuidev/core";

    import LegoPart from "./LegoPart.svelte";

    function compareLegoParts(a: LegoPartsResponse, b: LegoPartsResponse): 1 | 0 | -1 {
        // If one is already complete, it's "smaller"
        const aComplete = a.total_count === a.present_count;
        const bComplete = b.total_count === b.present_count;

        if (aComplete && !bComplete) return 1;
        if (!aComplete && bComplete) return -1;

        // Put minifigs to the top
        const aMinifig = a.part_number.startsWith("fig");
        const bMinifig = b.part_number.startsWith("fig");

        if (aMinifig && !bMinifig) return -1;
        if (!aMinifig && bMinifig) return 1;

        // Compare the part number
        if (a.part_number > b.part_number) return 1;
        if (a.part_number < b.part_number) return -1;
        return 0;
    }

    //#region Update opened set's parts
    let parts: LegoPartsResponse[] = [];
    let updatePartsActionRunning = false;

    async function updateOpenedSetsParts() {
        if (!$openedSet) parts = null;
        else {
            if (!parts) updatePartsActionRunning = true;
            parts = await pb.collection(Collections.LegoParts).getFullList(200, {filter: `set="${$openedSet}"`});
            updatePartsActionRunning = false;
        }
    }

    let openedSetUnsub, setUnsub;

    onMount(() => {
        openedSetUnsub = openedSet.subscribe(updateOpenedSetsParts);
        setUnsub = sets.subscribe(updateOpenedSetsParts);
    });

    onDestroy(() => {
        openedSetUnsub();
        setUnsub();
    });
    //#endregion
</script>

<div class="parts-list">
    {#if updatePartsActionRunning}
        <Stack align="center" override={{ height: "100%", width: "100%"}} spacing="xl">
            <Loader variant="bars" color="teal" size="xl"/>
        </Stack>
    {:else}
        {#each parts.sort(compareLegoParts) as part}
            <LegoPart {part}/>
        {/each}
    {/if}
</div>

<style lang="scss">
  @import "../vars";

  .parts-list {
    padding: $base-spacing;
    height: 100%;
    width: 100%;
    overflow-y: scroll;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $base-spacing;
  }
</style>
