import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import AuthenticationStore from './AuthenticationStore';
import LegoSetStore from '$/domain/stores/LegoSetStore.ts';

const AppStore = types.model('AppStore', {
  authenticationStore: types.optional(AuthenticationStore, () => AuthenticationStore.create()),
  legoSetStore: types.optional(LegoSetStore, () => LegoSetStore.create())
});

export default AppStore;

export interface IAppStore extends Instance<typeof AppStore> {
}

export interface IAppStoreSnapshotIn extends SnapshotIn<typeof AppStore> {
}

export interface IAppStoreSnapshotOut extends SnapshotOut<typeof AppStore> {
}
