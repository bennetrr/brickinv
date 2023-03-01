<script lang="ts">
    export let variation: "small" | "big" = "small";
    export let style: string;
</script>

<div class="card-container-{variation}" style={style}>
    <slot></slot>
</div>

<style lang="scss">
    @import "src/vars";

    @mixin card-container($_card-width, $_card-height) {
      width: 100%;
      height: 100%;
      padding: $base-spacing;  // No margin because of the scrollbar
      overflow-y: auto;

      display: grid;
      grid-template-columns: repeat(auto-fill, minmax($_card-width, auto));  // Put as many cards in a row as fit
      gap: $base-spacing;
      align-content: start;
      justify-content: start;

      // Center the cards if the cards shrink
      @media screen and (max-width: calc($sidebar-width + $_card-width + 2 * $base-spacing)) {
        justify-items: center;
        justify-content: center;
      }
    }

    .card-container-small {
      @include card-container($card-width, $card-height-small);
    }

    .card-container-big {
      @include card-container($card-width, $card-height-small);
    }
</style>
