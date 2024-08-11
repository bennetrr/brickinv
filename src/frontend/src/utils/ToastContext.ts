import { createContext, useContext } from 'react';
import { Toast } from 'primereact/toast';

const ToastContext = createContext<Toast | null>(null);
export const ToastProvider = ToastContext.Provider;

export function useToast(): Toast {
  const toast = useContext(ToastContext);

  if (!toast) {
    throw new Error('Toast not initialized!');
  }

  return toast;
}
