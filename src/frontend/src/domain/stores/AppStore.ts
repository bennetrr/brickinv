import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import SetStore from './SetStore';

const AppStore = types.model('AppStore', {
  setStore: types.optional(SetStore, () => SetStore.create())
});

export default AppStore;

export interface IAppStore extends Instance<typeof AppStore> {}

export interface IAppStoreSnapshotIn extends SnapshotIn<typeof AppStore> {}

export interface IAppStoreSnapshotOut extends SnapshotOut<typeof AppStore> {}
