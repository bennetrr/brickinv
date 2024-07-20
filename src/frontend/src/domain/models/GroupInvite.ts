import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { MSTDateTime } from '../../utils';
import UserProfile from './UserProfile.ts';
import Group from './Group.ts';

const GroupInvite = types.model('GroupInvite', {
  id: types.identifier,
  created: MSTDateTime,
  updated: MSTDateTime,
  group: Group,
  issuer: UserProfile,
  recipient: UserProfile
});

export default GroupInvite;

export interface IGroupInvite extends Instance<typeof GroupInvite> {
}

export interface IGroupInviteSnapshotIn extends SnapshotIn<typeof GroupInvite> {
}

export interface IGroupInviteSnapshotOut extends SnapshotOut<typeof GroupInvite> {
}
