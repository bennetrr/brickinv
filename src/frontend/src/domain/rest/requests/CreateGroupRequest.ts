export default class CreateGroupRequest {
  constructor(
    public readonly name: string,
    public readonly imageUri?: string
  ) {
  }
}
