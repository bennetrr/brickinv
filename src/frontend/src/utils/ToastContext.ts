import { createContext, useContext } from 'react';
import { Toast } from 'primereact/toast';

const ToastContext = createContext<Toast | null>(null);
export const ToastProvider = ToastContext.Provider;

export const useToast: (() => Toast) = () => useContext(ToastContext) as Toast;
