export default class CreateSetRequest {
  constructor(
    public readonly setId: string,
    public readonly groupId: string,
    public readonly forSale: boolean
  ) {
  }
}
