import { applySnapshot, flow, Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { Flow } from '@wemogy/reactbase';
import { AxiosResponse } from 'axios';
import { toast } from '../../ui';
import { IPart, IPartSnapshotIn, ISet, ISetSnapshotIn, Part, Set } from '../models';
import {
  ApiServiceFactory,
  CreateSetRequest,
  UpdatePartRequest,
  UpdatePartResponse,
  UpdateSetRequest
} from '../rest';

const SetStore = types.model('SetStore', {
  items: types.array(Set)
})
  .actions(self => ({
    querySets: flow(function* queryResourceTypes(): Flow<AxiosResponse<ISetSnapshotIn[]>, void> {
      const response = yield ApiServiceFactory.setApi.getSets();

      applySnapshot(self.items, response.data);
    }),
    createSet: flow(function* createSet(setId: string, forSale: boolean): Flow<AxiosResponse<ISetSnapshotIn>, ISet> {
      const request = new CreateSetRequest(setId, forSale);
      const response = yield ApiServiceFactory.setApi.createSet(request);

      const newSet = Set.create(response.data);
      self.items.push(newSet);

      toast.success(`Set "${newSet.setName}" created`);

      return newSet;
    }),
    updateSet: flow(function* updateSet(set: ISet): Flow<AxiosResponse<ISetSnapshotIn>, void> {
      const request = new UpdateSetRequest(set.forSale);
      const response = yield ApiServiceFactory.setApi.updateSet(set.id, request);

      applySnapshot(set, response.data);

      toast.success(`Set "${set.setName}" saved`);
    }),
    /* --- Parts --- */
    queryParts: flow(function* queryParts(setId: string): Flow<AxiosResponse<IPartSnapshotIn[]>, void> {
      const set = self.items.find(set => set.id === setId);
      if (!set) {
        return;
      }

      const response = yield ApiServiceFactory.partApi.getParts(setId);

      set.updateParts(() => response.data.map(x => Part.create(x)));
    }),
    updatePart: flow(function* updatePart(set: ISet, part: IPart): Flow<AxiosResponse<UpdatePartResponse>, void> {
      const request = new UpdatePartRequest(part.presentCount);
      const response = yield ApiServiceFactory.partApi.updatePart(set.id, part.id, request);

      applySnapshot(part, response.data.part);
      applySnapshot(set, response.data.set);

      toast.success(`Part ${part.partName} saved`);
    })
  })).views((self) => ({
    getSet(setId: string): ISet | undefined {
      return self.items.find(set => set.id === setId);
    }
  }));

export default SetStore;

export interface ISetStore extends Instance<typeof SetStore> {
}

export interface ISetStoreSnapshotIn extends SnapshotIn<typeof SetStore> {
}

export interface ISetStoreSnapshotOut extends SnapshotOut<typeof SetStore> {
}
