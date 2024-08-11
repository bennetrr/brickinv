import { DependencyList, useEffect } from 'react';

export type AsyncEffectCallback = () => Promise<void | (() => void)>;

export default function useAsyncEffect(effect: AsyncEffectCallback, deps: DependencyList) {
  useEffect((): (() => void) => {
    const promise = effect();

    return () => {
      promise.then(cleanup => {
        if (typeof cleanup === 'function') {
          cleanup();
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
