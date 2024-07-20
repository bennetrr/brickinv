import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { MSTDateTime } from '../../utils';
import UserProfile from './UserProfile.ts';
import { InsufficientPermissionsError } from '../exceptions';
import { IGroupInvite } from './GroupInvite.ts';
import { useAppStore } from '../hooks';

interface IGroupVolatile {
  rebrickableApiKey?: string;
  invites: IGroupInvite[];
}

const Group = types.model('Group', {
  id: types.identifier,
  created: MSTDateTime,
  updated: MSTDateTime,
  name: types.string,
  imageUri: types.maybe(types.string),
  owner: UserProfile,
  members: types.array(UserProfile)
}).volatile<IGroupVolatile>(() => ({
  rebrickableApiKey: undefined,
  invites: []
})).views(self => ({
  get isOwner(): boolean {
    return self.owner.id == useAppStore().userProfileStore.currentUserId;
  }

})).actions(self => ({
  setName(value: string) {
    if (!self.isOwner) {
      throw new InsufficientPermissionsError('You must be the owner of a group to change its name!');
    }

    self.name = value;
  },

  setImageUri(value?: string) {
    if (!self.isOwner) {
      throw new InsufficientPermissionsError('You must be the owner of a group to change its image!');
    }

    self.imageUri = value;
  },

  setRebrickableApiKey(value?: string) {
    if (!self.isOwner) {
      throw new InsufficientPermissionsError('You cannot change the Rebrickable API key of other users!');
    }

    self.rebrickableApiKey = value;
  },

  unsetRebrickableApiKey() {
    if (!self.isOwner) {
      throw new InsufficientPermissionsError('You cannot change the Rebrickable API key of other users!');
    }

    self.rebrickableApiKey = 'UNSET';
  }
}));

export default Group;

export interface IGroup extends Instance<typeof Group> {
}

export interface IGroupSnapshotIn extends SnapshotIn<typeof Group> {
}

export interface IGroupSnapshotOut extends SnapshotOut<typeof Group> {
}
