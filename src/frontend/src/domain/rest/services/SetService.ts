import { AxiosInstance, AxiosResponse } from 'axios';
import { ISetSnapshotIn } from '../../models';
import { CreateSetRequest, UpdateSetRequest } from '../requests';
import {
  NotFoundError,
  RebrickableApiKeyInvalidError,
  RebrickableSetNotFoundError,
  UnauthorizedError,
  UnexpectedHttpError,
  UserProfileNotFoundError
} from '../../exceptions';

export default class SetService {
  public constructor(
    private readonly axiosInstance: AxiosInstance
  ) {
  }

  /**
   * Get all sets from groups where the current user is the owner or a member.
   *
   * @returns All sets from groups where the current user is the owner or a member.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  public async getSets(): Promise<AxiosResponse<ISetSnapshotIn[]>> {
    const response = await this.axiosInstance.get(`/sets`);

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
   * Get the set with the specified id.
   *
   * @returns The set with the specified id.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the set was not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  public async getSet(id: string): Promise<AxiosResponse<ISetSnapshotIn>> {
    const response = await this.axiosInstance.get(`/sets/${id}`);

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
   * Create a set.
   *
   * @returns The created set.
   * @throws UserProfileNotFoundError If the current user does not have a user profile.
   * @throws RebrickableApiKeyInvalidError If the Rebrickable API key is invalid.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  public async createSet(request: CreateSetRequest): Promise<AxiosResponse<ISetSnapshotIn>> {
    const response = await this.axiosInstance.post(`/sets/`, request);

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
        switch (response.data) {
          case 'rebrickableApiKeyInvalid':
            throw new RebrickableApiKeyInvalidError();
          default:
            throw new UnauthorizedError();
        }
      case 404:
        switch (response.data) {
          case 'rebrickableSetNotFound':
            throw new RebrickableSetNotFoundError();
          default:
            throw new UnexpectedHttpError();
        }
      default:
        throw new UnexpectedHttpError();
    }
  }

  /**
   * Delete the set with the specified id and all corresponding data.
   *
   * @returns If the group was deleted successful.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the group was not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  public async deleteSet(id: string): Promise<AxiosResponse<void>> {
    const response = await this.axiosInstance.delete(`/sets/${id}`);

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
   * Update the set with the specified id.
   *
   * @returns The updated set.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the group or the recipient are not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  public async updateSet(id: string, request: UpdateSetRequest): Promise<AxiosResponse<ISetSnapshotIn>> {
    const response = await this.axiosInstance.patch(`/sets/${id}`, request);

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
}
