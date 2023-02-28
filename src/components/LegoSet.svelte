<script lang="ts">
    import {pb} from "../connectors/PocketBase";
    import type {LegoSetsResponse, UsersResponse} from "../interfaces/PocketBaseTypes";
    import {Collections} from "../interfaces/PocketBaseTypes";
    import {openedSet} from "../stores/SetStores";

    import {ActionIcon} from "@svelteuidev/core";
    import {Icon} from "svelte-fontawesome/main";
    import {faMoneyBillTransfer, faTrash} from "@fortawesome/free-solid-svg-icons";

    export let set: LegoSetsResponse<{ added_by_user: UsersResponse }>;

    function selectSet() {
        $openedSet = set.id;
    }

    async function removeSet(e: MouseEvent) {
        e.stopPropagation();  // Because the |stopPropagation modifier cannot be used on a component
        await pb
            .collection(Collections.LegoSets)
            .delete(set.id);
    }

    async function changeToSell(e: MouseEvent) {
        e.stopPropagation();
        await pb
            .collection(Collections.LegoSets)
            .update<LegoSetsResponse>(set.id, {...set, to_sell: !set.to_sell});
    }
</script>

<div class="set-card" class:set-card-completed="{set.present_parts === set.total_parts}" on:click={selectSet}>
    <img alt="{set.set_name}" class="set-image" src={set.image_url}/>

    <div>
        <span class="set-line-0">
            {set.set_name}
        </span>
        <br/>

        <span class="set-line-1">
            {set.set_number} • {set.release_year} • {set.present_parts} von {set.total_parts} Teilen
        </span>
        <br/>

        <span class="set-line-2">
            {set.to_sell ? "Verkaufen" : "Behalten"} • Hinzugefügt von {set.expand.added_by_user.username}
        </span>
    </div>

    <div class="set-buttons">
        <ActionIcon color="yellow" on:click={changeToSell} radius="xl" size="lg" variant="filled">
            <Icon icon={faMoneyBillTransfer}/>
        </ActionIcon>

        <ActionIcon color="red" on:click={removeSet} radius="xl" size="lg" variant="filled">
            <Icon icon={faTrash}/>
        </ActionIcon>
    </div>
</div>

<style lang="scss">
  @import "../vars";

  .set-card {
    width: 300px;
    height: 300px;
    padding: $small-spacing;

    position: relative;
    flex-direction: column;
    display: flex;
    gap: $base-spacing;

    background-color: $base-color;
    outline: $base-border;
    border-radius: $card-radius;
    cursor: pointer;

    &:hover {
      outline: $base-border-alt1;
    }

    // Not supported on firefox
    &:has(button:hover) {
      outline: $base-border;
    }

    @media screen and (min-width: calc($card-width + $sidebar-width + (2 * $base-spacing))) {
      height: $card-height;
      width: $card-width;
      flex-direction: row;
    }
  }

  .set-card-completed {
    outline: $completed-border;

    &:hover {
      outline: $completed-border-alt1;
    }

    &:has(button:hover) {
      outline: $completed-border;
    }
  }

  .set-image {
    max-height: $card-height;
    max-width: calc($card-width * 0.4);
    height: auto;
    width: auto;
    align-self: center;
  }

  .set-line-0 {
    font-weight: bold;
  }

  .set-buttons {
    display: flex;
    flex-direction: row;
    gap: $base-spacing;

    position: absolute;
    right: $base-spacing;
    bottom: $base-spacing;
  }
</style>
