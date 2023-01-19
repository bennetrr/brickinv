import {toast as svelteToast} from "@zerodevx/svelte-toast";

namespace toast {
    export function pushError(message: string) {
        svelteToast.push(message, {
            pausable: true,
            theme: {
                "--toastBarBackground": "var(--error-color)",
                "--toastBackground": "var(--error-color-alt)"
            }
        });
    }

    export function pushInfo(message: string) {
        svelteToast.push(message, {
            pausable: true,
            theme: {
                "--toastBarBackground": "var(--info-color)",
                "--toastBackground": "var(--info-color-alt)"
            }
        });
    }

    export function pushSuccess(message: string) {
        svelteToast.push(message, {
            pausable: true,
            theme: {
                "--toastBarBackground": "var(--success-color)",
                "--toastBackground": "var(--success-color-alt)"
            }
        });
    }

    export function pushWarning(message: string) {
        svelteToast.push(message, {
            pausable: true,
            theme: {
                "--toastBarBackground": "var(--warning-color)",
                "--toastBackground": "var(--warning-color-alt)"
            }
        });
    }
}

export default toast;
