<script lang="ts">
    import type {NotificationProps} from "./NotificationStore";
    import {Check, Cross2, ExclamationTriangle} from "radix-icons-svelte";
    import {Notification} from "@svelteuidev/core";
    import {createEventDispatcher} from "svelte";

    export let notification: NotificationProps;

    const dispatch = createEventDispatcher();

    function remove() {
        dispatch("remove", {
            id: notification.id
        });
    }

    if (notification.duration > 0) {
        setTimeout(remove, notification.duration * 1000);
    }
</script>

{#if notification.type === "error"}
    <Notification title={notification.title} icon={Cross2} color="red" on:close={remove}>
        {notification.text}
    </Notification>
{:else if notification.type === "warning"}
    <Notification title={notification.title} icon={ExclamationTriangle} color="yellow" on:close={remove}>
        {notification.text}
    </Notification>
{:else if notification.type === "info"}
    <Notification title={notification.title} color="cyan" on:close={remove}>
        {notification.text}
    </Notification>
{:else if notification.type === "success"}
    <Notification title={notification.title} icon={Check} color="teal" on:close={remove}>
        {notification.text}
    </Notification>
{:else if notification.type === "loading"}
    <Notification title={notification.title} loading withCloseButton={false} color="cyan">
        {notification.text}
    </Notification>
{/if}
