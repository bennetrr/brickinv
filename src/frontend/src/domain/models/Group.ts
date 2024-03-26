import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { MSTDateTime } from '../../utils';
import UserProfile from './UserProfile.ts';
import { InsufficientPermissionsError } from '../exceptions';

const Group = types.model('Group', {
  id: types.identifier,
  created: MSTDateTime,
  updated: MSTDateTime,
  name: types.string,
  imageUri: types.maybe(types.string),
  owner: UserProfile,
  members: types.array(UserProfile)
}).views(self => ({
  get isOwner(): boolean {
    return self.owner.id == 'authStore.userId';  // TODO: Replace with real user id getter
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
  }
}));

export default Group;

export interface IGroup extends Instance<typeof Group> {
}

export interface IGroupSnapshotIn extends SnapshotIn<typeof Group> {
}

export interface IGroupSnapshotOut extends SnapshotOut<typeof Group> {
}
