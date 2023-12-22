import { applySnapshot, Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { flow } from 'mobx';
import { Flow } from '@wemogy/reactbase';
import { AxiosResponse } from 'axios';
import { ILegoSet, ILegoSetSnapshotIn, LegoAppApiServiceFactory } from '$/domain';
import LegoSet from '$/domain/models/LegoSet';
import { toast } from '$/ui';

const LegoSetStore = types.model('LegoSetStore', {
  items: types.optional(types.array(LegoSet), [])
})
.actions((self) => ({
  queryLegoSets: flow(function* queryResourceTypes(): Flow<AxiosResponse<ILegoSetSnapshotIn[]>, void> {
    const response = yield LegoAppApiServiceFactory.legoSetApi.getLegoSets();

    applySnapshot(self.items, response.data);
  }),
  createSet: flow(function* createSet(setId: string, forSale: boolean): Flow<AxiosResponse<ILegoSetSnapshotIn>, ILegoSet> {
    const response = yield LegoAppApiServiceFactory.legoSetApi.createLegoSet(setId, forSale);
    console.log(response)

    const newSet = LegoSet.create(response.data);
    self.items.push(newSet);

    toast.success(`Set ${newSet.setName} created`);

    return newSet;
  }),
}));

export default LegoSetStore;

export interface ILegoSetStore extends Instance<typeof LegoSetStore> {
}

export interface ILegoSetStoreSnapshotIn extends SnapshotIn<typeof LegoSetStore> {
}

export interface ILegoSetStoreSnapshotOut extends SnapshotOut<typeof LegoSetStore> {
}
