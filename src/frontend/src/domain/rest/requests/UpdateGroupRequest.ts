export default class UpdateGroupRequest {
  constructor(
    public readonly name: string,
    public readonly imageUri?: string,
    public readonly rebrickableApiKey?: string
  ) {
  }
}
