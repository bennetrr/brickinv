import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';

const AuthenticationStore = types.model('AuthenticationStore', {
  isAuthenticated: types.optional(types.boolean, false),
  userId: types.maybe(types.string)
}).actions(self => ({
  setIsAuthenticated(value: boolean) {
    self.isAuthenticated = value;
  },

  setUserId(value?: string) {
    self.userId = value;
  }
}));

export default AuthenticationStore;

export interface IAuthenticationStore extends Instance<typeof AuthenticationStore> {
}

export interface IAuthenticationStoreSnapshotIn extends SnapshotIn<typeof AuthenticationStore> {
}

export interface IAuthenticationStoreSnapshotOut extends SnapshotOut<typeof AuthenticationStore> {
}
