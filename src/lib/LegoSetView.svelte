<script lang="ts">
    import type {LegoSet} from "./DataStructures";
    import {selectedSetId} from "./stores";
    export let set: LegoSet;

    function selectSetHandler() {
        selectedSetId.set(set.id)
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

    @mixin set-view($border-color) {
      height: $height;
      width: 100%;
      display: flex;
      flex-direction: row;

      border: 2px solid $border-color;
      border-radius: 15px;
      padding: 5px;
      cursor: pointer;

      &:hover {
        background-color: $background-color3;
      }
    }

    .set-view {
        @include set-view(rgba(0, 0, 0, 0.42))
    }

    .set-view-active {
        @include set-view($highlight-color)
    }

    .set-view-column-left {
        width: 30%;
        margin-right: 10px;
    }

    .set-view-column-right {

    }

    .set-image {
        height: 100%;
    }
</style>