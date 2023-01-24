import {writable} from "svelte/store";
import {v4 as uuid4} from "uuid";

export interface NotificationProps {
    id?: string;
    type: "error" | "warning" | "info" | "success" | "loading";
    title?: string;
    text: string;
    // When the notification should disappear; in seconds; 0 for a permanent notification
    duration: number;
}

export const notifications = writable<NotificationProps[]>([]);

export default function addNotification(data: NotificationProps): string {
    data.id = uuid4();
    notifications.update(oldData => [...oldData, data]);
    return data.id;
}

export function removeNotification(id: string) {
    notifications.update(oldData => oldData.filter(x => x.id !== id));
}
