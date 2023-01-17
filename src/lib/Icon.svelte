<script lang="ts">
    import {Icon} from "svelte-fontawesome/main.js";
    import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

    export let icon: IconDefinition;
    export let className: string = undefined;
    export let fixedWidth: boolean = false;
    export let size: "lg" | "sm" | "xs" = undefined;
    export let stackSize: "1x" | "2x" = undefined;
    export let inverse: boolean = false;
</script>

<Icon
        class={className}
        fw={fixedWidth}
        icon={icon}
        inverse={inverse}
        size={size}
        stack={stackSize}
/>
