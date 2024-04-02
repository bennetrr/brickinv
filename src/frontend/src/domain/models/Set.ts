import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { MSTDateTime } from '../../utils';
import { IPart } from './Part';

function compareParts(a: IPart, b: IPart): 1 | 0 | -1 {
  // If one is already complete, it's "smaller"
  if (a.isComplete && !b.isComplete) {
    return 1;
  }
  if (!a.isComplete && b.isComplete) {
    return -1;
  }

  // Put minifigs to the top
  if (a.isMinifig && !b.isMinifig) {
    return -1;
  }
  if (!a.isMinifig && b.isMinifig) {
    return 1;
  }

  // Compare the part number
  if (a.partId > b.partId) {
    return 1;
  }
  if (a.partId < b.partId) {
    return -1;
  }
  return 0;
}

interface ISetVolatile {
  parts: IPart[];
}

const Set = types.model('Set', {
  id: types.identifier,
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
}).volatile<ISetVolatile>(() => ({
  parts: []
})).views(self => ({
  get partsSorted() {
    return self.parts.slice().sort(compareParts);
  },

  getPart(id: string): IPart | undefined {
    return self.parts.find(x => x.id === id);
  }

})).actions(self => ({
  setForSale(value: boolean) {
    self.forSale = value;
  }

}));

export default Set;

export interface ISet extends Instance<typeof Set> {
}

export interface ISetSnapshotIn extends SnapshotIn<typeof Set> {
}

export interface ISetSnapshotOut extends SnapshotOut<typeof Set> {
}
