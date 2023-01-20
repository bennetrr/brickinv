<script lang="ts">
    import type {LegoSet} from "./DataStructures";
    import {selectedSetId} from "./stores";
    import {Group, Image} from "@svelteuidev/core";

    export let set: LegoSet;

    function selectSetHandler() {
        selectedSetId.set(set.id);
    }
</script>

<div class="set-view" class:set-view-active={set.id === $selectedSetId} on:click={selectSetHandler}>
    <Group>
        <Image class="set-image" fit="contain" height={80} src={set.imageUrl} width={110}/>
        <div>
            <span class="set-name">{set.setName}</span>
            <br>
            <span class="set-number">{set.setNumber}</span>
            <span class="set-dot">•</span>
            <span class="set-year">{set.releaseYear}</span>
            <span class="set-dot">•</span>
            <span class="set-part-count">{set.totalPartCount} Teile</span>
            <br>
            <span class="set-to-sell">{set.toSell ? "Verkaufen" : "Behalten"}</span>
            <span class="set-dot">•</span>
            <span class="set-username">Hinzugefügt von {set.addedByUserName}</span>
        </div>
    </Group>
</div>

<style lang="scss">
  @import "vars";

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
</style>
