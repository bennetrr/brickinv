import { AxiosInstance, AxiosResponse } from 'axios';
import { IGroupInviteSnapshotIn, IGroupSnapshotIn } from '../../models';
import { CreateGroupRequest, UpdateGroupRequest } from '../requests';
import { NotFoundError, UnauthorizedError, UnexpectedHttpError, UserProfileNotFoundError } from '../../exceptions';

export default class GroupService {
  public constructor(
    private readonly axiosInstance: AxiosInstance
  ) {
  }

  /**
   * Get all groups where the current user is the owner or a member.
   *
   * @returns All groups where the current user is the owner or a member.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  public async getGroups(): Promise<AxiosResponse<IGroupSnapshotIn[]>> {
    const response = await this.axiosInstance.get(`/groups`);

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
   * Get the group with the specified id.
   *
   * @returns The group with the specified id.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the group was not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  public async getGroup(id: string): Promise<AxiosResponse<IGroupSnapshotIn>> {
    const response = await this.axiosInstance.get(`/groups/${id}`);

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
   * Create a group.
   *
   * @returns The created group.
   * @throws UserProfileNotFoundError If the current user does not have a user profile.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  public async createGroup(request: CreateGroupRequest): Promise<AxiosResponse<IGroupSnapshotIn>> {
    const response = await this.axiosInstance.post(`/groups/`, request);

    switch (response.status) {
      case 201:
        return response;
      case 400:
        switch (response.data) {
          case 'userProfileNotFound':
            throw new UserProfileNotFoundError();
          default:
            throw new UnexpectedHttpError();
        }
      case 401:
        throw new UnauthorizedError();
      default:
        throw new UnexpectedHttpError();
    }
  }

  /**
   * Delete the group with the specified id and all corresponding data.
   *
   * @returns If the group was deleted successful.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the group was not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  public async deleteGroup(id: string): Promise<AxiosResponse<void>> {
    const response = await this.axiosInstance.delete(`/groups/${id}`);

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
   * Update the group with the specified id.
   *
   * @returns The updated group.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the group was not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  public async updateGroup(id: string, request: UpdateGroupRequest): Promise<AxiosResponse<IGroupSnapshotIn>> {
    const response = await this.axiosInstance.patch(`/groups/${id}`, request);

    switch (response.status) {
      case 202:
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
   * Get all invites of the group with the specified id.
   *
   * @returns All invites of the group with the specified id.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the group was not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  public async getGroupInvites(id: string): Promise<AxiosResponse<IGroupInviteSnapshotIn[]>> {
    const response = await this.axiosInstance.get(`/groups/${id}/invites`);

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
}
