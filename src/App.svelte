<script lang="ts">
    import MainPage from "./lib/MainPage.svelte";
    import Login from "./lib/Login.svelte";
    import {currentUser} from "./lib/PocketBase";
</script>

{#if $currentUser}
    <MainPage/>
{:else}
    <Login/>
{/if}
