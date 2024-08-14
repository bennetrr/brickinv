import { createContext, useContext, RefObject } from 'react';
import { Toast, ToastMessage } from 'primereact/toast';

const ToastContext = createContext<RefObject<Toast> | null>(null);
export const ToastProvider = ToastContext.Provider;

interface IToast {
  /**
   * Used to show the message.
   * @param {ToastMessage | ToastMessage[]} message - Message to show
   */
  show(message: ToastMessage | ToastMessage[]): void;
  /**
   * Clears the all messages from Toast.
   */
  clear(): void;
  /**
   * Used to add new messages after removing all old messages.
   * @param {ToastMessage | ToastMessage[]} message - Message to replace
   */
  replace(message: ToastMessage | ToastMessage[]): void;
  /**
   * Used to remove messages.
   * @param {ToastMessage | ToastMessage[]} message - Message to remove
   */
  remove(message: ToastMessage | ToastMessage[]): void;
}

export function useToast(): IToast {
  const toast = useContext(ToastContext);

  return {
    show(message: ToastMessage | ToastMessage[]) {
      if (!toast?.current) {
        console.error('Toast is not initialized, but messages were sent:', message);
        return;
      }

      toast.current.show(message);
    },
    clear() {
      if (toast?.current) {
        toast.current.clear();
      }
    },
    remove(message: ToastMessage | ToastMessage[]) {
      if (toast?.current) {
        toast.current.remove(message);
      }
    },
    replace(message: ToastMessage | ToastMessage[]) {
      if (!toast?.current) {
        console.error('Toast is not initialized, but messages were sent:', message);
        return;
      }

      toast.current.replace(message);
    }
  }
}
