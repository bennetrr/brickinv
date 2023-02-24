<script lang="ts">
    import {pb} from "../connectors/PocketBase";
    import type {LegoSetsResponse, UsersResponse} from "../interfaces/PocketBaseTypes";
    import {Collections} from "../interfaces/PocketBaseTypes";
    import {openedSet} from "../stores/SetStores";

    import {ActionIcon, Group, Image} from "@svelteuidev/core";
    import {Icon} from "svelte-fontawesome/main";
    import {faTrash} from "@fortawesome/free-solid-svg-icons";

    export let set: LegoSetsResponse<{ added_by_user: UsersResponse }>;

    function selectSet() {
        $openedSet = set.id;
    }

    async function removeSet(e: MouseEvent) {
        e.stopPropagation();  // Because the |stopPropagation modifier cannot be used on a component
        await pb.collection(Collections.LegoSets).delete(set.id);
    }
</script>

<div class="set-view" class:set-view-active={set.id === $openedSet}
     class:set-view-complete={set.present_parts === set.total_parts} on:click={selectSet}>
    <Group>
        <Image class="set-image" fit="contain" height={80} src={set.image_url} width={110}/>
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
                <ActionIcon on:click={removeSet}
                            override={{"&:hover": {backgroundColor: "transparent", color: "$colors$red900"}}}>
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
