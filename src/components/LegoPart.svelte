<script lang="ts">
    import {pb} from "../connectors/PocketBase";
    import type {LegoPartsResponse, LegoSetsResponse} from "../interfaces/PocketBaseTypes";
    import {Collections} from "../interfaces/PocketBaseTypes";
    import {sets} from "../stores/SetStores";

    import {ActionIcon} from "@svelteuidev/core";
    import {Icon} from "svelte-fontawesome/main";
    import {faCheck, faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";

    export let part: LegoPartsResponse;

    //#region Update present count
    function presentCountPlusOne() {
        if (part.present_count >= part.total_count) return;
        pb
            .collection(Collections.LegoParts)
            .update<LegoPartsResponse>(part.id, {
                ...part,
                present_count: part.present_count + 1
            });

        const changedSet = $sets.find(x => x.id === part.set);
        pb
            .collection(Collections.LegoSets)
            .update<LegoSetsResponse>(part.set, {
                ...changedSet,
                present_parts: changedSet.present_parts + 1
            });
    }

    function presentCountMinusOne() {
        if (part.present_count <= 0) return;
        pb
            .collection(Collections.LegoParts)
            .update<LegoPartsResponse>(part.id, {
                ...part,
                present_count: part.present_count - 1
            });

        const changedSet = $sets.find(x => x.id === part.set);
        pb
            .collection(Collections.LegoSets)
            .update<LegoSetsResponse>(part.set, {
                ...changedSet,
                present_parts: changedSet.present_parts - 1
            });
    }

    function presentCountSetComplete() {
        if (part.present_count >= part.total_count) return;
        pb
            .collection(Collections.LegoParts)
            .update<LegoPartsResponse>(part.id, {
                ...part,
                present_count: part.total_count
            });

        const changedSet = $sets.find(x => x.id === part.set);
        pb
            .collection(Collections.LegoSets)
            .update<LegoSetsResponse>(part.set, {
                ...changedSet,
                present_parts: changedSet.present_parts - part.present_count + part.total_count
            });
    }

    //#endregion

    //#region Style overrides for buttons
    const buttonStyleOverride = {
        "&:disabled": {
            border: "$borderWidths$light solid $colors$gray700"
        }
    };

    const leftButtonStyleOverride = {
        ...buttonStyleOverride,
        borderBottomLeftRadius: "$radii$sm",
        borderTopLeftRadius: "$radii$sm"
    };

    const rightButtonStyleOverride = {
        ...buttonStyleOverride,
        borderBottomRightRadius: "$radii$sm",
        borderTopRightRadius: "$radii$sm"
    };
    //#endregion
</script>

<div class="part-view" class:part-view-completed="{part.present_count === part.total_count}">
    <img alt={part.part_name} class="part-image" src={part.image_url}/>

    <div>
        <span class="part-line-0">
            {part.part_name}
        </span>
        <br/>

        <span class="part-line-1">
            {part.part_number}
            {#if part.color_name} • {part.color_name} {/if}
        </span>
    </div>

    <div class="part-count-panel">
        <ActionIcon disabled={part.present_count <= 0} on:click={presentCountMinusOne}
                    override={leftButtonStyleOverride} radius={0} size={34} variant="outline">
            <Icon icon={faMinus}/>
        </ActionIcon>

        <span class="part-count-present">{part.present_count}</span>

        <ActionIcon disabled={part.present_count >= part.total_count} on:click={presentCountPlusOne}
                    override={rightButtonStyleOverride} radius={0} size={34} variant="outline">
            <Icon icon={faPlus}/>
        </ActionIcon>

        <span class="part-count-total">von {part.total_count}</span>

        <ActionIcon disabled={part.present_count >= part.total_count} on:click={presentCountSetComplete}
                    override={buttonStyleOverride} size={34} variant="outline">
            <Icon icon={faCheck}/>
        </ActionIcon>
    </div>
</div>

<style lang="scss">
  @import "src/vars";
  @import "src/components/ui/cards/card";

  .part-view {
    @include card($card-width, $card-height-big, $card-shrunk-width, $card-shrunk-height-big, $sidebar-width);

    position: relative;
    display: flex;
    flex-direction: row;
    gap: $base-spacing;
  }

  .part-view-completed {
    outline: $completed-border;
  }

  .part-image {
    @include card-image($card-width, $card-height-big);
  }

  .part-line-0 {
    font-weight: bold;
  }

  .part-count-panel {
    display: flex;
    flex-direction: row;

    position: absolute;
    bottom: $base-spacing;
    right: $base-spacing;
  }

  .part-count-total {
    align-self: center;
    margin: 0 $base-spacing;
  }

  .part-count-present {
    width: 34px;
    height: 34px;

    $border: 1px solid rgb(73, 80, 87);
    border-top: $border;
    border-bottom: $border;

    text-align: center;
    line-height: 34px;
  }
</style>
