import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { MSTDateTime } from '../../utils';
import { IPart } from './Part';

function compareParts(a: IPart, b: IPart): 1 | 0 | -1 {
  // If one is already complete, it's "smaller"
  const aComplete = a.totalCount === a.presentCount;
  const bComplete = b.totalCount === b.presentCount;

  if (aComplete && !bComplete) {
    return 1;
  }
  if (!aComplete && bComplete) {
    return -1;
  }

  // Put minifigs to the top
  const aMinifig = a.partId.startsWith('fig');
  const bMinifig = b.partId.startsWith('fig');

  if (aMinifig && !bMinifig) {
    return -1;
  }
  if (!aMinifig && bMinifig) {
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
})).actions(self => ({
  updateParts(updateFn: (parts: IPart[]) => IPart[]) {
    self.parts = updateFn(self.parts);
  }
})).views(self => ({
  get partsSorted() {
    return self.parts.slice().sort(compareParts);
  }
}));

export default Set;

export interface ISet extends Instance<typeof Set> {
}

export interface ISetSnapshotIn extends SnapshotIn<typeof Set> {
}

export interface ISetSnapshotOut extends SnapshotOut<typeof Set> {
}
