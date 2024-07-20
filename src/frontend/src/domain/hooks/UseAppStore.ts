import { useContext } from 'react';
import { MobXProviderContext } from 'mobx-react';
import { IAppStore } from '../stores';

const useAppStore = (): IAppStore => useContext(MobXProviderContext).appStore;

export default useAppStore;
