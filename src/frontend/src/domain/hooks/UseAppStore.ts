import { IAppStore } from '$/domain/stores/AppStore.ts';
import { useContext } from 'react';
import { MobXProviderContext } from 'mobx-react';

const useAppStore = (): IAppStore => useContext(MobXProviderContext).appStore;

export default useAppStore;
