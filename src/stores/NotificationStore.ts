import {writable} from "svelte/store";
import {v4 as uuid4} from "uuid";

import type NotificationProps from "../interfaces/NotificationProps";

export const notifications = writable<NotificationProps[]>([]);

export function addNotification(data: NotificationProps): string {
    data.id = uuid4();
    data.time_shown = 0;
    notifications.update(oldData => [...oldData, data]);
    return data.id;
}

export function removeNotification(id: string) {
    notifications.update(oldData => oldData.filter(x => x.id !== id));
}
