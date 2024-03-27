import { AxiosInstance, AxiosResponse } from 'axios';
import { IGroupInviteSnapshotIn } from '../../models';
import { CreateGroupInviteRequest } from '../requests';
import {
  InvitingMemberError,
  InvitingSelfError,
  NotFoundError,
  UnauthorizedError,
  UnexpectedHttpError,
  UserProfileNotFoundError
} from '../../exceptions';

export default class GroupInviteService {
  public constructor(
    private readonly axiosInstance: AxiosInstance
  ) {
  }

  /**
   * Get all group invites where the current user is the recipient.
   *
   * @returns All group invites where the current user is the recipient.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  public async getGroupInvites(): Promise<AxiosResponse<IGroupInviteSnapshotIn[]>> {
    const response = await this.axiosInstance.get(`/group-invites`);

    switch (response.status) {
      case 200:
        return response;
      case 401:
        throw new UnauthorizedError();
      default:
        throw new UnexpectedHttpError();
    }
  }

  /**
   * Get the group invite with the specified id.
   *
   * @returns The group invite with the specified id.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the group invite was not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  public async getGroupInvite(id: string): Promise<AxiosResponse<IGroupInviteSnapshotIn>> {
    const response = await this.axiosInstance.get(`/group-invites/${id}`);

    switch (response.status) {
      case 200:
        return response;
      case 401:
        throw new UnauthorizedError();
      case 404:
        throw new NotFoundError();
      default:
        throw new UnexpectedHttpError();
    }
  }

  /**
   * Create a group invite.
   *
   * @returns The created group invite.
   * @throws InvitingSelfError If the recipient is the current user.
   * @throws InvitingMemberError If the recipient is already a member of the group.
   * @throws UserProfileNotFoundError If the issuer (the current user) does not have a user profile.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the group or the recipient are not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  public async createGroupInvite(request: CreateGroupInviteRequest): Promise<AxiosResponse<IGroupInviteSnapshotIn>> {
    const response = await this.axiosInstance.post(`/sets/`, request);

    switch (response.status) {
      case 201:
        return response;
      case 400:
        switch (response.data) {
          case 'invitingSelf':
            throw new InvitingSelfError();
          case 'invitingMember':
            throw new InvitingMemberError();
          case 'userProfileNotFound':
            throw new UserProfileNotFoundError();
          default:
            throw new UnexpectedHttpError();
        }
      case 401:
        throw new UnauthorizedError();
      case 404:
        throw new NotFoundError();
      default:
        throw new UnexpectedHttpError();
    }
  }

  /**
   * Accept the group invite with the specified id.
   *
   * @returns If the group invite was accepted successfully.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the group invite was not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  public async acceptGroupInvite(id: string): Promise<AxiosResponse<void>> {
    const response = await this.axiosInstance.get(`/group-invites/${id}/accept`);

    switch (response.status) {
      case 204:
        return response;
      case 401:
        throw new UnauthorizedError();
      case 404:
        throw new NotFoundError();
      default:
        throw new UnexpectedHttpError();
    }
  }

  /**
   * Delete / reject the group invite with the specified id.
   *
   * @returns If the group invite was deleted successfully.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the group invite was not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  public async deleteGroupInvite(id: string): Promise<AxiosResponse<void>> {
    const response = await this.axiosInstance.delete(`/group-invites/${id}`);

    switch (response.status) {
      case 204:
        return response;
      case 401:
        throw new UnauthorizedError();
      case 404:
        throw new NotFoundError();
      default:
        throw new UnexpectedHttpError();
    }
  }
}
