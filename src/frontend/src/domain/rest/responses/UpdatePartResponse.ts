import { IPartSnapshotIn, ISetSnapshotIn } from '../../models';

export default class UpdatePartResponse {
  constructor(
    public readonly part: IPartSnapshotIn,
    public readonly set: ISetSnapshotIn
  ) {
  }
}
