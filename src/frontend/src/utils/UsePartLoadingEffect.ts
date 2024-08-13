import { useClerk } from '@clerk/clerk-react';
import { ISet, UnauthorizedError, useAppStore } from '../domain';
import { useToast } from './ToastContext';
import { useState } from 'react';
import { useAsyncEffect } from './index';

export default function usePartLoadingEffect(set: ISet | undefined, force: boolean = false): boolean {
  const clerk = useClerk();
  const { setStore } = useAppStore();
  const toast = useToast();

  const [loading, setLoading] = useState(true);

  useAsyncEffect(async () => {
    if (!set) {
      return;
    }

    if (!force && set.parts.length !== 0) {
      setLoading(false);
      return;
    }

    try {
      await setStore.queryParts(set);
    } catch (exc) {
      if (exc instanceof UnauthorizedError) {
        toast.show({
          severity: 'error',
          summary: 'Failed to load parts',
          detail:
            'There is a problem with your session. Try reloading the page or signing out and back in. If that does not help, wait a few minutes and try again.'
        });
      } else {
        toast.show({
          severity: 'error',
          summary: 'Failed to load parts',
          detail: 'There was an unexpected error. Try reloading the page or wait a few minutes.'
        });
      }

      return;
    } finally {
      setLoading(false);
    }
  }, [clerk.session?.id, setStore, setStore.items.length, set, toast]);

  return loading;
}
