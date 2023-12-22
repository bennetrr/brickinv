import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { MSTDateTime } from '$/utils';

const LegoSet = types.model('LegoSet', {
  id: types.string,
  created: MSTDateTime,
  updated: MSTDateTime,
  setId: types.string,
  setName: types.string,
  releaseYear: types.integer,
  imageUri: types.string,
  totalParts: types.integer,
  presentParts: types.integer,
  forSale: types.boolean,
  finished: types.boolean
});

export default LegoSet;

export interface ILegoSet extends Instance<typeof LegoSet> {
}

export interface ILegoSetSnapshotIn extends SnapshotIn<typeof LegoSet> {
}

export interface ILegoSetSnapshotOut extends SnapshotOut<typeof LegoSet> {
}
