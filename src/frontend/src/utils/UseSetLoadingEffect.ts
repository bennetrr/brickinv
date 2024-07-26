import { useClerk } from '@clerk/clerk-react';
import { UnauthorizedError, useAppStore } from '../domain';
import { useToast } from './ToastContext';
import { useState } from 'react';
import { useAsyncEffect } from './index';

export default function useSetLoadingEffect(force: boolean = false): boolean {
  const clerk = useClerk();
  const { setStore } = useAppStore();
  const toast = useToast();

  const [loading, setLoading] = useState(true);

  useAsyncEffect(async () => {
    if (!force && setStore.items.length !== 0) {
      setLoading(false);
      return;
    }

    try {
      await setStore.querySets();
    } catch (exc) {
      if (exc instanceof UnauthorizedError) {
        toast.show({
          severity: 'error',
          summary: 'Failed to load sets',
          detail: 'There is a problem with your session. Try reloading the page or signing out and back in. If that does not help, wait a few minutes and try again.'
        });
      } else {
        toast.show({
          severity: 'error',
          summary: 'Failed to load sets',
          detail: 'There was an unexpected error. Try reloading the page or wait a few minutes.'
        });
      }

      return;
    } finally {
      setLoading(false);
    }
  }, [clerk.session?.id, setStore.items.length]);

  return loading;
}
