import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { AuthSession } from '$/domain/models';

const AuthenticationStore = types.model('AuthenticationStore', {
  authSession: types.optional(AuthSession, () => AuthSession.create())
});

export default AuthenticationStore;

export interface IAuthenticationStore extends Instance<typeof AuthenticationStore> {
}

export interface IAuthenticationStoreSnapshotIn extends SnapshotIn<typeof AuthenticationStore> {
}

export interface IAuthenticationStoreSnapshotOut extends SnapshotOut<typeof AuthenticationStore> {
}
