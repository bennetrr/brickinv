<script lang="ts">
    import {pb} from "../connectors/PocketBase";
    import type {LegoSetsResponse, UsersResponse} from "../interfaces/PocketBaseTypes";
    import {Collections} from "../interfaces/PocketBaseTypes";
    import {openedSet} from "../stores/SetStores";

    import {ActionIcon, Group, Image} from "@svelteuidev/core";
    import {Icon} from "svelte-fontawesome/main";
    import {faMoneyBill, faMoneyBill1, faTrash} from "@fortawesome/free-solid-svg-icons";

    export let set: LegoSetsResponse<{ added_by_user: UsersResponse }>;

    function selectSet() {
        $openedSet = set.id;
    }

    async function removeSet(e: MouseEvent) {
        e.stopPropagation();  // Because the |stopPropagation modifier cannot be used on a component
        await pb.collection(Collections.LegoSets).delete(set.id);
    }

    async function changeToSell(e: MouseEvent) {
        e.stopPropagation();
        await pb.collection(Collections.LegoSets).update<LegoSetsResponse>(set.id, {...set, to_sell: !set.to_sell})
    }
</script>

<div class="set-view" class:set-view-complete={set.present_parts === set.total_parts} on:click={selectSet}>
    <Group>
        <img src={set.image_url} alt="Set Image" class="set-image">

        <div>
            <span class="set-name">{set.set_name}</span>
            <br>
            <span class="set-number">{set.set_number}</span>
            <span class="set-dot">•</span>
            <span class="set-year">{set.release_year}</span>
            <span class="set-dot">•</span>
            <span class="set-part-count">{set.present_parts}</span>
            <span class="set-dot">von</span>
            <span class="set-part-count">{set.total_parts} Teilen</span>
            <br>
            <Group>
                <div>
                    <span class="set-to-sell">{set.to_sell ? "Verkaufen" : "Behalten"}</span>
                    <span class="set-dot">•</span>
                    <span class="set-username">Hinzugefügt von {set.expand.added_by_user.username}</span>
                </div>
                <div class="set-buttons">
                    <ActionIcon on:click={changeToSell} color="yellow" size="lg" radius="xl" variant="filled">
                        <Icon icon={faMoneyBill1}/>
                    </ActionIcon>
                    <ActionIcon on:click={removeSet} color="red" size="lg" radius="xl" variant="filled">
                        <Icon icon={faTrash}/>
                    </ActionIcon>
                </div>
            </Group>
        </div>
    </Group>
</div>

<style lang="scss">
  @import "../vars";

  .set-view {
    height: 150px;
    position: relative;

    padding: $small-spacing;
    display: flex;
    flex-direction: row;

    background-color: $base-color;
    border: $base-border;
    border-radius: $card-border-radius;
    cursor: pointer;

    &:hover {
      outline: $base-border-alt2;
    }
  }

  .set-view-complete {
    border-color: $success-color;
  }

  .set-image {
    max-height: calc($card-height - (2 * $small-spacing));
    max-width: 200px;
  }

  .set-name {
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
