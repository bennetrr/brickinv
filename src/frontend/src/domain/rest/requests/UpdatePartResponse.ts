import { IPartSnapshotIn, ISetSnapshotIn } from '$/domain/models';

export default class UpdatePartResponse {
  constructor(
    public readonly part: IPartSnapshotIn,
    public readonly set: ISetSnapshotIn
  ) {
  }
}
