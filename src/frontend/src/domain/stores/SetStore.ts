import { applySnapshot, Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { flow } from 'mobx';
import { Flow } from '@wemogy/reactbase';
import { AxiosResponse } from 'axios';
import { toast } from '$/ui';
import { IPartSnapshotIn, ISet, ISetSnapshotIn, Set } from '$/domain/models/';
import { ApiServiceFactory } from '$/domain/rest';

const SetStore = types.model('SetStore', {
  items: types.optional(types.array(Set), [])
})
    .actions(self => ({
      querySets: flow(function* queryResourceTypes(): Flow<AxiosResponse<ISetSnapshotIn[]>, void> {
        const response = yield ApiServiceFactory.setApi.getSets();

        applySnapshot(self.items, response.data);
      }),
      createSet: flow(function* createSet(setId: string, forSale: boolean): Flow<AxiosResponse<ISetSnapshotIn>, ISet> {
        // TODO: Fails with 'cannot modify' (Ask Sebastian)
        // TODO: Add error handling
        const response = yield ApiServiceFactory.setApi.createSet(setId, forSale);

        const newSet = Set.create(response.data);
        self.items.push(newSet);

        toast.success(`Set ${newSet.setName} created`);

        return newSet;
      }),
      /* --- Parts --- */
      queryParts: flow(function* queryParts(setId: string): Flow<AxiosResponse<IPartSnapshotIn[]>, void> {
        const set = self.items.find(set => set.id === setId);
        if (!set) {
          return;
        }

        const response = yield ApiServiceFactory.partApi.getParts(setId);

        applySnapshot(set.parts, response.data);
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
