import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import AuthenticationStore from './AuthenticationStore';
import SetStore from './SetStore';
import GroupStore from './GroupStore.ts';
import UserProfileStore from './UserProfileStore.ts';

const AppStore = types.model('AppStore', {
  authenticationStore: types.optional(AuthenticationStore, () => AuthenticationStore.create()),
  groupStore: types.optional(GroupStore, () => GroupStore.create()),
  setStore: types.optional(SetStore, () => SetStore.create()),
  userProfileStore: types.optional(UserProfileStore, () => UserProfileStore.create())
});

export default AppStore;

export interface IAppStore extends Instance<typeof AppStore> {
}

export interface IAppStoreSnapshotIn extends SnapshotIn<typeof AppStore> {
}

export interface IAppStoreSnapshotOut extends SnapshotOut<typeof AppStore> {
}
