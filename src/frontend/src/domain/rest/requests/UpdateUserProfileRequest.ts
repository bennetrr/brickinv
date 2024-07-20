export default class UpdateUserProfileRequest {
  constructor(
    public readonly username: string,
    public readonly profileImageUri?: string,
    public readonly rebrickableApiKey?: string
  ) {
  }
}
