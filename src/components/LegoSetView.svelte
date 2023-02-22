<script lang="ts">
    import type {LegoSet} from "../interfaces/DataStructures";
    import {selectedSetId, sets} from "../stores/stores";
    import {ActionIcon, Group, Image} from "@svelteuidev/core";
    import {faTrash} from "@fortawesome/free-solid-svg-icons";
    import {Icon} from "svelte-fontawesome/main";
    import {pb} from "../connectors/PocketBase";
    import {onMount} from "svelte";

    export let set: LegoSet;

    function selectSet() {
        selectedSetId.set(set.id);
    }

    function removeSet(e: MouseEvent) {
        e.stopPropagation()
        pb.collection("lego_sets").delete(set.id);
        sets.update(oldSets => oldSets.filter(x => x.id != set.id));
        if ($selectedSetId === set.id) selectedSetId.set(undefined);
    }

    let totalPartCount = 0;

    onMount(() => {
        for (let part of set.parts) {
            totalPartCount += part.partCount;
        }
    })

    let completedPartCount;
    $: {
        completedPartCount = 0
        for (let part of set.parts) completedPartCount += part.presentPartCount;
    }
</script>

<div class="set-view" class:set-view-active={set.id === $selectedSetId} class:set-view-complete={completedPartCount === totalPartCount} on:click={selectSet}>
    <Group>
        <Image class="set-image" fit="contain" height={80} src={set.imageUrl} width={110}/>
        <div>
            <span class="set-name">{set.setName}</span>
            <br>
            <span class="set-number">{set.setNumber}</span>
            <span class="set-dot">•</span>
            <span class="set-year">{set.releaseYear}</span>
            <span class="set-dot">•</span>
            <span class="set-part-count">{completedPartCount}</span>
            <span class="set-dot">von</span>
            <span class="set-part-count">{totalPartCount} Teilen</span>
            <br>
            <Group>
                <div>
                    <span class="set-to-sell">{set.toSell ? "Verkaufen" : "Behalten"}</span>
                    <span class="set-dot">•</span>
                    <span class="set-username">Hinzugefügt von {set.addedByUserName}</span>
                </div>
                <ActionIcon on:click={removeSet} override={{"&:hover": {backgroundColor: "transparent", color: "$colors$red900"}}}>
                    <Icon icon={faTrash}/>
                </ActionIcon>
            </Group>
        </div>
    </Group>
</div>

<style lang="scss">
  @import "../vars";

  .set-view {
    height: 100px;
    width: 100%;

    padding: $small-spacing;
    margin-top: $base-spacing;
    display: flex;
    flex-direction: row;

    background-color: $base-color;
    border: $base-border;
    border-radius: $card-border-radius;
    cursor: pointer;

    &:hover {
      background-color: $base-color-alt2;
    }
  }

  .set-view-active {
    background-color: $base-color-alt3;

    &:hover {
      background-color: $base-color-alt3;
    }
  }

  .set-view-complete {
    border-color: $success-color;
  }
</style>
