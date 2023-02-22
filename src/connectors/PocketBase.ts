import PocketBase from "pocketbase";
import {writable} from "svelte/store";
import type {UsersResponse} from "../interfaces/PocketBaseTypes";

export const pb = new PocketBase("https://api.lego.bennetr.me");
// @ts-ignore
export const currentUser = writable<UsersResponse>(pb.authStore.model);

pb.authStore.onChange(() => {
    // @ts-ignore
    currentUser.set(pb.authStore.model);
});
