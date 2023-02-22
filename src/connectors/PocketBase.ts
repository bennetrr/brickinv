import PocketBase from "pocketbase";
import {writable} from "svelte/store";

export const pb = new PocketBase("https://api.lego.bennetr.me");
export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange(() => {
    currentUser.set(pb.authStore.model);
});

export async function getUserIdFromName(username: string): Promise<string> {
    const user = await pb.collection("users").getFirstListItem(`username="${username}"`);
    return user.id;
}

export async function getUsernameFromUserId(userId: string): Promise<string> {
    const user = await pb.collection("users").getOne(userId);
    return user.username;
}
