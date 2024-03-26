export default class CreateGroupInviteRequest {
  constructor(
    public readonly groupId: string,
    public readonly recipientUserId: string
  ) {
  }
}
