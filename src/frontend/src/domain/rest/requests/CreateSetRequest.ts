export default class CreateSetRequest {
  constructor(
      public readonly setId: string,
      public readonly forSale: boolean
  ) {
  }
}
