<script lang="ts">
    import {pb} from "./PocketBase";
    import {Button, Stack, TextInput} from "@svelteuidev/core";
    import {Icon} from "svelte-fontawesome/main";
    import {faKey, faUser} from "@fortawesome/free-solid-svg-icons";

    let username: string;
    let password: string;

    async function login() {
        await pb.collection("users").authWithPassword(username, password);
    }
</script>

<Stack override={{ height: "100%", width: "100%"}}  align="center" spacing="xl">
    <TextInput label="Name">
        <svelte:fragment slot="rightSection">
            <Icon icon={faUser}/>
        </svelte:fragment>
    </TextInput>

    <TextInput label="Passwort" type="password">
        <svelte:fragment slot="rightSection">
            <Icon icon={faKey}/>
        </svelte:fragment>
    </TextInput>

    <Button variant="gradient">
        Anmelden
    </Button>
</Stack>
