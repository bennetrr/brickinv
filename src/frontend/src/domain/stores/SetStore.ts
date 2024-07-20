import { applySnapshot, flow, Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { Flow } from '../../utils';
import { AxiosResponse } from 'axios';
import { IPart, IPartSnapshotIn, ISet, ISetSnapshotIn, Part, Set } from '../models';
import { ApiServiceFactory, CreateSetRequest, UpdatePartRequest, UpdateSetRequest } from '../rest';
import { UpdatePartResponse } from '../rest/responses';

const SetStore = types.model('SetStore', {
  items: types.array(Set)
}).views((self) => ({
  getSet(id: string): ISet | undefined {
    return self.items.find(x => x.id === id);
  }

})).actions(self => ({
  /**
   * Get all sets from groups where the current user is the owner or a member.
   *
   * @returns All sets from groups where the current user is the owner or a member.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  querySets: flow(function* querySets(): Flow<AxiosResponse<ISetSnapshotIn[]>, void> {
    const response = yield ApiServiceFactory.setApi.getSets();

    applySnapshot(self.items, response.data);
  }),

  /**
   * Get the set with the specified id.
   *
   * @returns The set with the specified id.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the set was not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  querySet: flow(function* querySet(id: string): Flow<AxiosResponse<ISetSnapshotIn>, void> {
    const response = yield ApiServiceFactory.setApi.getSet(id);

    const oldSet = self.getSet(response.data.id);

    if (!oldSet) {
      self.items.push(Set.create(response.data));
    } else {
      applySnapshot(oldSet, response.data);
    }
  }),

  /**
   * Create a set.
   *
   * @returns The created set.
   * @throws UserProfileNotFoundError If the current user does not have a user profile.
   * @throws RebrickableApiKeyInvalidError If the Rebrickable API key is invalid.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  createSet: flow(function* createSet(setId: string, groupId: string, forSale: boolean): Flow<AxiosResponse<ISetSnapshotIn>, ISet> {
    const request = new CreateSetRequest(setId, groupId, forSale);
    const response = yield ApiServiceFactory.setApi.createSet(request);

    const newSet = Set.create(response.data);
    self.items.push(newSet);
    return newSet;
  }),

  /**
   * Delete the set with the specified id and all corresponding data.
   *
   * @returns If the group was deleted successful.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the group was not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  deleteSet: flow(function* deleteSet(set: ISet): Flow<AxiosResponse<void>, void> {
    yield ApiServiceFactory.setApi.deleteSet(set.id);
    self.items.remove(set);
  }),

  /**
   * Update the set with the specified id.
   *
   * @returns The updated set.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the group or the recipient are not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  updateSet: flow(function* updateSet(set: ISet): Flow<AxiosResponse<ISetSnapshotIn>, void> {
    const request = new UpdateSetRequest(set.forSale);
    const response = yield ApiServiceFactory.setApi.updateSet(set.id, request);

    applySnapshot(set, response.data);
  }),

  //region Parts
  /**
   * Get all parts of the specified set.
   *
   * @returns All parts of the specified set.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the set was not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  queryParts: flow(function* queryParts(set: ISet): Flow<AxiosResponse<IPartSnapshotIn[]>, void> {
    const response = yield ApiServiceFactory.partApi.getParts(set.id);

    set.parts = response.data.map(x => Part.create(x));
  }),

  /**
   * Get the part with the specified id.
   *
   * @returns The part with the specified id.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the set or the part was not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  queryPart: flow(function* queryPart(set: ISet, id: string): Flow<AxiosResponse<IPartSnapshotIn>, void> {
    const response = yield ApiServiceFactory.partApi.getPart(set.id, id);

    const oldPart = set.getPart(id);

    if (!oldPart) {
      set.parts.push(Part.create(response.data));
    } else {
      applySnapshot(oldPart, response.data);
    }
  }),

  /**
   * Update the part with the specified id.
   *
   * @returns The updated part and set.
   * @throws PresentCountOutOfRangeError If the updated present count of a part is not between 0 and the total count.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the group or the recipient are not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  updatePart: flow(function* updatePart(set: ISet, part: IPart): Flow<AxiosResponse<UpdatePartResponse>, void> {
    const request = new UpdatePartRequest(part.presentCount);
    const response = yield ApiServiceFactory.partApi.updatePart(set.id, part.id, request);

    applySnapshot(part, response.data.part);
    applySnapshot(set, response.data.set);
  })
  //endregion
}));

export default SetStore;

export interface ISetStore extends Instance<typeof SetStore> {
}

export interface ISetStoreSnapshotIn extends SnapshotIn<typeof SetStore> {
}

export interface ISetStoreSnapshotOut extends SnapshotOut<typeof SetStore> {
}
