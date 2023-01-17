<script lang="ts">
    import {pb} from "./PocketBase";

    let username: string;
    let password: string;

    async function login() {
        await pb.collection("users").authWithPassword(username, password);
    }
</script>

<form on:submit|preventDefault>
    <input bind:value={username} placeholder="Name" type="text"/>
    <input bind:value={password} placeholder="Passwort" type="password"/>
    <button on:click={login}>Anmelden</button>
</form>
