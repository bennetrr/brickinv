<script lang="ts">
    import type {LegoPart} from "./DataStructures";

    export let part: LegoPart;
</script>

<div class="part-view-complete">
    <div class="part-view-column-left">
        <img class="part-image" src={part.imageUrl}/>
    </div>
    <div class="part-view-column-right">
        <span class="part-name">{part.partName}</span>
        <br>
        <span class="part-number">{part.partNumber}</span>
        <span class="part-dot">•</span>
        <span class="part-year">{part.colorName}</span>
        <span class="part-dot">•</span>
        <br>
        <span class="part-part-count">{part.partCount} Teile</span>
        <span>/</span>
        <span class="part-to-sell">{part.presentPartCount}</span>
    </div>
</div>

<style lang="scss">
  @import "vars";

  $height: 120px;

  @mixin part-view($border) {
    height: $height;

    padding: $small-spacing;
    display: flex;
    flex-direction: row;

    background-color: $base-color-alt2;
    border: $border;
    border-radius: $card-border-radius;
  }

  .part-view {
    @include part-view($base-color-alt2);
  }

  .part-view-complete {
    @include part-view(2px solid $success-color)
  }

  .part-view-column-left {
    margin: auto $small-spacing auto 0;
  }

  .part-view-column-right {
    margin: auto 0;
  }

  .part-image {
    max-height: calc($height - 20px);
    max-width: 110px;
  }
</style>