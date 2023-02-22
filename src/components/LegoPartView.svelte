<script lang="ts">
    import type {LegoPart} from "../interfaces/DataStructures";
    import {ActionIcon, Group, Image} from "@svelteuidev/core";
    import {Icon} from "svelte-fontawesome/main";
    import {faCheck, faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";

    export let part: LegoPart;
    export let partCountChanged: (partNumber: string, newCount: number) => void;

    function partPlusOne() {
        if (part.presentPartCount >= part.partCount) return;
        partCountChanged(part.partNumber, part.presentPartCount + 1);
    }

    function partMinusOne() {
        if (part.presentPartCount <= 0) return;
        partCountChanged(part.partNumber, part.presentPartCount - 1);
    }

    function partSetComplete() {
        if (part.presentPartCount >= part.partCount) return;
        partCountChanged(part.partNumber, part.partCount);
    }

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

<div class="part-view" class:part-view-complete={part.presentPartCount === part.partCount}>
    <Group noWrap>
        <Image class="part-image" fit="contain" height={100} src={part.imageUrl} width={120}/>
        <div>
            <span class="part-name">{part.partName}</span>
            <br>
            <span class="part-number">{part.partNumber}</span>
            {#if part.colorName}
                <span class="part-dot">•</span>
                <span class="part-color">{part.colorName}</span>
            {/if}
            <br>
            <Group noWrap>
                <ActionIcon disabled={part.presentPartCount <= 0} on:click={partMinusOne}
                            override={leftButtonStyleOverride} radius={0}
                            size={34} variant="outline">
                    <Icon icon={faMinus}/>
                </ActionIcon>
                <span class="part-count-present">{part.presentPartCount}</span>
                <ActionIcon disabled={part.presentPartCount >= part.partCount} on:click={partPlusOne}
                            override={rightButtonStyleOverride} radius={0}
                            size={34} variant="outline">
                    <Icon icon={faPlus}/>
                </ActionIcon>
                <span class="part-count">von {part.partCount}</span>
                <ActionIcon disabled={part.presentPartCount >= part.partCount} on:click={partSetComplete}
                            override={buttonStyleOverride}
                            size={34} variant="outline">
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
    border-radius: $card-border-radius;
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
