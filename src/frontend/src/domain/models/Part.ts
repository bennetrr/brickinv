import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { MSTDateTime } from '../../utils';
import { DateTime } from 'luxon';

const Part = types
  .model('Part', {
    id: types.identifier,
    created: MSTDateTime,
    updated: MSTDateTime,
    partId: types.string,
    partName: types.string,
    partColor: types.maybe(types.string),
    imageUri: types.maybe(types.string),
    imageWidth: types.maybe(types.integer),
    imageHeight: types.maybe(types.integer),
    totalCount: types.integer,
    presentCount: types.integer
  })
  .views(self => ({
    get isComplete() {
      return self.presentCount === self.totalCount;
    },

    get isMinifig() {
      return self.partId.startsWith('fig');
    }
  }))
  .actions(self => ({
    setPresentCount(count: number) {
      if (count > self.totalCount || count < 0) {
        return;
      }

      self.presentCount = count;
      self.updated = DateTime.now();
    }
  }));

export default Part;

export interface IPart extends Instance<typeof Part> {}

export interface IPartSnapshotIn extends SnapshotIn<typeof Part> {}

export interface IPartSnapshotOut extends SnapshotOut<typeof Part> {}
