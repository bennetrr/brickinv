<script lang="ts">
    import type {LegoSet} from "./DataStructures";
    import {selectedSetId} from "./stores";

    export let set: LegoSet;

    function selectSetHandler() {
        selectedSetId.set(set.id);
    }
</script>

<div class={set.id === $selectedSetId ? "set-view-active" : "set-view"} on:click={selectSetHandler}>
    <div class="set-view-column-left">
        <img class="set-image" src={set.imageUrl}/>
    </div>
    <div class="set-view-column-right">
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
</div>

<style lang="scss">
  @import "vars";

  $height: 100px;

  @mixin set-view($background-color) {
    height: $height;
    width: 100%;

    padding: $small-spacing;
    margin-top: $base-spacing;
    display: flex;
    flex-direction: row;

    background-color: $background-color;
    border: $base-border;
    border-radius: $card-border-radius;
    cursor: pointer;
  }

  .set-view {
    @include set-view($base-color);

    &:hover {
      background-color: $base-color-alt2;
    }
  }

  .set-view-active {
    @include set-view($base-color-alt3);
  }

  .set-view-column-left {
    width: 30%;
  }

  .set-image {
    max-width: 110px;
  }
</style>