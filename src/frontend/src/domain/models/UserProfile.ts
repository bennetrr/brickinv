import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { MSTDateTime } from '../../utils';
import { InsufficientPermissionsError } from '../exceptions';
import { useAppStore } from '../hooks';

interface IUserProfileVolatile {
  rebrickableApiKey?: string;
}

const UserProfile = types.model('UserProfile', {
  id: types.identifier,
  created: MSTDateTime,
  updated: MSTDateTime,
  username: types.string,
  profileImageUri: types.maybe(types.string)
}).volatile<IUserProfileVolatile>(() => ({
  rebrickableApiKey: undefined
})).views(self => ({
  get isOwnProfile(): boolean {
    return self.id == useAppStore().authenticationStore.userId;
  }

})).actions(self => ({
  setUsername(value: string) {
    if (!self.isOwnProfile) {
      throw new InsufficientPermissionsError('You cannot change the name of other users!');
    }

    self.username = value;
  },

  setProfileImageUri(value?: string) {
    if (!self.isOwnProfile) {
      throw new InsufficientPermissionsError('You cannot change the profile image of other users!');
    }

    self.profileImageUri = value;
  },

  setRebrickableApiKey(value?: string) {
    if (!self.isOwnProfile) {
      throw new InsufficientPermissionsError('You cannot change the Rebrickable API key of other users!');
    }

    self.rebrickableApiKey = value;
  },

  unsetRebrickableApiKey() {
    if (!self.isOwnProfile) {
      throw new InsufficientPermissionsError('You cannot change the Rebrickable API key of other users!');
    }

    self.rebrickableApiKey = 'UNSET';
  }
}));

export default UserProfile;

export interface IUserProfile extends Instance<typeof UserProfile> {
}

export interface IUserProfileSnapshotIn extends SnapshotIn<typeof UserProfile> {
}

export interface IUserProfileSnapshotOut extends SnapshotOut<typeof UserProfile> {
}
