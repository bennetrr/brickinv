import { applySnapshot, flow, Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { Flow } from '@wemogy/reactbase';
import { AxiosResponse } from 'axios';
import { IGroup, IGroupSnapshotIn, Group, IGroupInviteSnapshotIn, GroupInvite } from '../models';
import { ApiServiceFactory, CreateGroupRequest, UpdateGroupRequest } from '../rest';

const GroupStore = types.model('GroupStore', {
  items: types.array(Group)
}).views((self) => ({
  getGroup(id: string): IGroup | undefined {
    return self.items.find(x => x.id === id);
  }

})).actions(self => ({
  /**
   * Get all groups.
   *
   * @returns All groups.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  queryGroups: flow(function* queryGroups(): Flow<AxiosResponse<IGroupSnapshotIn[]>, void> {
    const response = yield ApiServiceFactory.groupApi.getGroups();

    applySnapshot(self.items, response.data);
  }),

  /**
   * Get the group with the specified id.
   *
   * @returns The group with the specified id.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the group was not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  queryGroup: flow(function* queryGroup(id: string): Flow<AxiosResponse<IGroupSnapshotIn>, void> {
    const response = yield ApiServiceFactory.groupApi.getGroup(id);

    const oldGroup = self.getGroup(response.data.id);

    if (!oldGroup) {
      self.items.push(Group.create(response.data));
    } else {
      applySnapshot(oldGroup, response.data);
    }
  }),

  /**
   * Create a group.
   *
   * @returns The created group.
   * @throws UserProfileNotFoundError If the current user does not have a user profile.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  createGroup: flow(function* createGroup(name: string, imageUri?: string): Flow<AxiosResponse<IGroupSnapshotIn>, IGroup> {
    const request = new CreateGroupRequest(name, imageUri);
    const response = yield ApiServiceFactory.groupApi.createGroup(request);

    const newGroup = Group.create(response.data);
    self.items.push(newGroup);

    return newGroup;
  }),

  /**
   * Delete the group with the specified id and all corresponding data.
   *
   * @returns If the group was deleted successful.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the group was not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  deleteGroup: flow(function* deleteGroup(group: IGroup): Flow<AxiosResponse<void>, void> {
    yield ApiServiceFactory.groupApi.deleteGroup(group.id);
    self.items.remove(group);
    // TODO: Reload sets
  }),

  /**
   * Update the group with the specified id.
   *
   * @returns The updated group.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the group was not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  updateGroup: flow(function* updateGroup(group: IGroup): Flow<AxiosResponse<IGroupSnapshotIn>, void> {
    const request = new UpdateGroupRequest(group.name, group.imageUri, group.rebrickableApiKey);
    const response = yield ApiServiceFactory.groupApi.updateGroup(group.id, request);

    applySnapshot(group, response.data);
    group.rebrickableApiKey = undefined;
  }),

  /**
   * Get all invites of the group with the specified id.
   *
   * @returns All invites of the group with the specified id.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the group was not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  queryGroupInvites: flow(function* queryGroupInvites(group: IGroup): Flow<AxiosResponse<IGroupInviteSnapshotIn[]>, void> {
    const response = yield ApiServiceFactory.groupApi.getGroupInvites(group.id);

    group.invites = response.data.map(x => GroupInvite.create(x));
  })
}));

export default GroupStore;

export interface IGroupStore extends Instance<typeof GroupStore> {
}

export interface IGroupStoreSnapshotIn extends SnapshotIn<typeof GroupStore> {
}

export interface IGroupStoreSnapshotOut extends SnapshotOut<typeof GroupStore> {
}
