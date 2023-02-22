<script lang="ts">
    import {currentUser} from "./connectors/PocketBase";

    import MainPage from "./components/MainPage.svelte";
    import Login from "./components/LoginPage.svelte";
    import NotificationContainer from "./components/NotificationContainer.svelte";
</script>

<NotificationContainer/>

{#if $currentUser}
    <MainPage/>
{:else}
    <Login/>
{/if}
