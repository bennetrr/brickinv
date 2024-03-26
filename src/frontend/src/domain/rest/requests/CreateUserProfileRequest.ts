export default class CreateUserProfileRequest {
  constructor(
    public readonly username: string,
    public readonly profileImageUri?: string
  ) {
  }
}
