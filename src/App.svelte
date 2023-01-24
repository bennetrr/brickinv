<script lang="ts">
    import MainPage from "./lib/MainPage.svelte";
    import Login from "./lib/Login.svelte";
    import {currentUser} from "./lib/PocketBase";
    import NotificationContainer from "./lib/notifications/NotificationContainer.svelte";
</script>

<NotificationContainer/>

{#if $currentUser}
    <MainPage/>
{:else}
    <Login/>
{/if}
