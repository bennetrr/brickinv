import {readable} from "svelte/store";

export default function useMediaQuery(mediaQueryString: string) {
    return readable<boolean>(null, (set) => {
        // Create a mediaQueryList object that holds the query
        const mediaQuery = window.matchMedia(mediaQueryString);
        set(mediaQuery.matches);

        // Listen to changes in the viewport and update the store
        const mediaQueryListener = (e: MediaQueryListEvent) => set(e.matches);
        mediaQuery.addEventListener("change", mediaQueryListener);

        // Return a function to remove the listener that is called when the store has no more users
        return () => mediaQuery.removeEventListener("change", mediaQueryListener);
    });
}
