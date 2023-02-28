<script lang="ts">
    import {pb} from "../connectors/PocketBase";
    import type {LegoPartsResponse, LegoSetsResponse} from "../interfaces/PocketBaseTypes";
    import {Collections} from "../interfaces/PocketBaseTypes";
    import {sets} from "../stores/SetStores";

    import {ActionIcon, Group, Image} from "@svelteuidev/core";
    import {Icon} from "svelte-fontawesome/main";
    import {faCheck, faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";

    export let part: LegoPartsResponse;

    //#region Update present count
    function presentCountPlusOne() {
        if (part.present_count >= part.total_count) return;
        pb.collection(Collections.LegoParts).update<LegoPartsResponse>(part.id, {...part, present_count: part.present_count + 1});

        const changedSet = $sets.find(x => x.id === part.set);
        pb.collection(Collections.LegoSets).update<LegoSetsResponse>(part.set, {...changedSet, present_parts: changedSet.present_parts + 1});
    }

    function presentCountMinusOne() {
        if (part.present_count <= 0) return;
        pb.collection(Collections.LegoParts).update<LegoPartsResponse>(part.id, {...part, present_count: part.present_count - 1});

        const changedSet = $sets.find(x => x.id === part.set);
        pb.collection(Collections.LegoSets).update<LegoSetsResponse>(part.set, {...changedSet, present_parts: changedSet.present_parts - 1});
    }

    function presentCountSetComplete() {
        if (part.present_count >= part.total_count) return;
        pb.collection(Collections.LegoParts).update<LegoPartsResponse>(part.id, {...part, present_count: part.total_count});

        const changedSet = $sets.find(x => x.id === part.set);
        pb.collection(Collections.LegoSets).update<LegoSetsResponse>(part.set, {...changedSet, present_parts: changedSet.present_parts - part.present_count + part.total_count});
    }

    //#endregion

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
</script>

<div class="part-view" class:part-view-complete={part.present_count === part.total_count}>
    <Group noWrap>
        <Image class="part-image" fit="contain" height={100} src={part.image_url} width={120}/>
        <div>
            <span class="part-name">{part.part_name}</span>
            <br>
            <span class="part-number">{part.part_number}</span>
            {#if part.color_name}
                <span class="part-dot">•</span>
                <span class="part-color">{part.color_name}</span>
            {/if}
            <br>
            <Group noWrap>
                <ActionIcon disabled={part.present_count <= 0} on:click={presentCountMinusOne}
                            override={leftButtonStyleOverride} radius={0} size={34} variant="outline">
                    <Icon icon={faMinus}/>
                </ActionIcon>
                <span class="part-count-present">{part.present_count}</span>
                <ActionIcon disabled={part.present_count >= part.total_count} on:click={presentCountPlusOne}
                            override={rightButtonStyleOverride} radius={0} size={34} variant="outline">
                    <Icon icon={faPlus}/>
                </ActionIcon>
                <span class="part-count">von {part.total_count}</span>
                <ActionIcon disabled={part.present_count >= part.total_count} on:click={presentCountSetComplete}
                            override={buttonStyleOverride} size={34} variant="outline">
                    <Icon icon={faCheck}/>
                </ActionIcon>
            </Group>
        </div>
    </Group>
</div>

<style lang="scss">
  @import "../vars";

  .part-view {
    height: 140px;

    padding: $small-spacing;
    display: flex;
    flex-direction: row;

    background-color: $base-color;
    border: $base-border;
    border-radius: $card-radius;
  }

  .part-view-complete {
    border-color: $success-color;
  }

  .part-count-present {
    width: 34px;
    height: 34px;
    border: 1px solid rgb(73, 80, 87);
    margin-right: -17px;
    margin-left: -17px;
    text-align: center;
    line-height: 34px;
  }
</style>
