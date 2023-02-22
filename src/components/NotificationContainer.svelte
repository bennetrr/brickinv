<script lang="ts">
    import {notifications, removeNotification} from "../stores/NotificationStore";

    import Notification from "./Notification.svelte";
    import {onDestroy, onMount} from "svelte";

    let intervallId;

    onMount(() => {
        intervallId = setInterval(() => {
            $notifications
                .filter(x => x.duration >= 0)
                .forEach(x => {
                    x.time_shown++;
                    if (x.time_shown >= x.duration * 10) removeNotification(x.id);
                });
        }, 100);
    });

    onDestroy(() => {
        clearInterval(intervallId);
    });
</script>

<div class="notification-container">
    {#each $notifications as notification}
        <Notification notification={notification} on:remove={e => removeNotification(e.detail.id)}/>
    {/each}
</div>

<style lang="scss">
  @import "../vars";

  .notification-container {
    position: absolute;
    z-index: 1000;
    right: $base-spacing;
    top: $base-spacing;
  }
</style>
