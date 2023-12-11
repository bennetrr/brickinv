import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';

const AuthSession = types.model('AuthSession', {
  tokenType: types.optional(types.string, ''),
  accessToken: types.optional(types.string, ''),
  refreshToken: types.optional(types.string, ''),
  expiresIn: types.optional(types.number, 0)
}).volatile(() => ({
  createdAt: Date.now()
})).actions((self) => ({
  setSession(tokenType: string, accessToken: string, refreshToken: string, expiresIn: number) {
    self.tokenType = tokenType;
    self.accessToken = accessToken;
    self.refreshToken = refreshToken;
    self.expiresIn = expiresIn;
    self.createdAt = Date.now();
  }
})).views((self) => ({
  get isExpired() {
    return (Date.now() - self.createdAt) > self.expiresIn;
  },
  get isAuthenticated() {
    return self.accessToken !== '' && !this.isExpired;
  }
}));

export default AuthSession;

export interface IAuthSession extends Instance<typeof AuthSession> {
}

export interface IAuthSessionSnapshotIn extends SnapshotIn<typeof AuthSession> {
}

export interface IAuthSessionSnapshotOut extends SnapshotOut<typeof AuthSession> {
}
