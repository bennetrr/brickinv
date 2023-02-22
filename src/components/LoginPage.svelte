<script lang="ts">
    import {pb} from "../connectors/PocketBase";
    import {Collections} from "../interfaces/PocketBaseTypes";
    import {addNotification} from "../stores/NotificationStore";

    import {Button, Stack, TextInput} from "@svelteuidev/core";
    import {Icon} from "svelte-fontawesome/main";
    import {faKey, faUser} from "@fortawesome/free-solid-svg-icons";

    let username: string;
    let password: string;

    function handleEnterPress(e: KeyboardEvent) {
        if (e.key === "Enter") login();
    }

    async function login() {
        try {
            await pb.collection(Collections.Users).authWithPassword(username, password);
        } catch (e) {
            addNotification({type: "error", title: "Anmeldung fehlgeschlagen!", text: "Falscher Benutzername oder falsches Passwort eingegeben", duration: 10});
        }
    }
</script>

<Stack align="center" override={{ height: "100%", width: "100%"}} spacing="xl">
    <TextInput bind:value={username} label="Name" on:keypress={handleEnterPress}>
        <svelte:fragment slot="rightSection">
            <Icon icon={faUser}/>
        </svelte:fragment>
    </TextInput>

    <TextInput bind:value={password} label="Passwort" type="password" on:keypress={handleEnterPress}>
        <svelte:fragment slot="rightSection">
            <Icon icon={faKey}/>
        </svelte:fragment>
    </TextInput>

    <Button on:click={login} variant="gradient">
        Anmelden
    </Button>
</Stack>
