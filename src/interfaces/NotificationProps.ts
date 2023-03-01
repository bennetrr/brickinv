export default interface NotificationProps {
    id?: string;
    type: "error" | "warning" | "info" | "success" | "loading";
    title?: string;
    text: string;
    // When the notification should disappear; in seconds; 0 for a permanent notification
    duration: number;
    time_shown?: number;
}
