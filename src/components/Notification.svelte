<script lang="ts">
    import type NotificationProps from "../interfaces/NotificationProps";

    import {createEventDispatcher} from "svelte";
    import {Notification} from "@svelteuidev/core";
    import {Check, Cross2} from "radix-icons-svelte";
    import Exclamation from "./icons/Exclamation.svelte";

    export let notification: NotificationProps;

    const dispatch = createEventDispatcher();

    function remove() {
        dispatch("remove", {
            id: notification.id
        });
    }

    const overrideStyles = {
        minWidth: 300,
        marginBottom: 15,
        padding: 20
    };
</script>

{#if notification.type === "error"}
    <Notification title={notification.title} override={overrideStyles} icon={Cross2} color="red" on:close={remove}>
        {notification.text}
    </Notification>
{:else if notification.type === "warning"}
    <Notification title={notification.title} override={overrideStyles} icon={Exclamation} color="yellow"
                  on:close={remove}>
        {notification.text}
    </Notification>
{:else if notification.type === "info"}
    <Notification title={notification.title} override={overrideStyles} color="cyan" on:close={remove}>
        {notification.text}
    </Notification>
{:else if notification.type === "success"}
    <Notification title={notification.title} override={overrideStyles} icon={Check} color="teal" on:close={remove}>
        {notification.text}
    </Notification>
{:else if notification.type === "loading"}
    <Notification title={notification.title} override={overrideStyles} loading withCloseButton={false} color="cyan">
        {notification.text}
    </Notification>
{/if}
