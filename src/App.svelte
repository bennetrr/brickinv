<script lang="ts">
    import MainPage from "./lib/MainPage.svelte";
    import Login from "./lib/Login.svelte";
    import {currentUser} from "./lib/PocketBase";
    import {SvelteToast} from "@zerodevx/svelte-toast";
</script>

<SvelteToast/>

{#if $currentUser}
    <MainPage/>
{:else}
    <Login/>
{/if}
