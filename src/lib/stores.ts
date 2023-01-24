// Select one set to show the part list
import {writable} from "svelte/store";
import type {LegoSet} from "./DataStructures";

export const selectedSetId = writable<string>();

export const sets = writable<LegoSet[]>([]);

export const addSetActionRunning = writable(false);

interface NotificationProps {
    id?: string;
    type: "error" | "warning" | "info" | "success" | "loading";
    title: string;
    text: string;
    // When the notification should disappear; 0 for a permanent notification
    duration: number

}

export const notifications = writable<NotificationProps[]>([]);

export function addNotification(data: NotificationProps): string {
    const id = uuid.
}
