import { AxiosInstance, AxiosResponse } from 'axios';
import { IUserProfileSnapshotIn } from '../../models';
import { CreateUserProfileRequest, UpdateUserProfileRequest } from '../requests';
import { NotFoundError, UnauthorizedError, UnexpectedHttpError, UserProfileAlreadyExistsError } from '../../exceptions';

export default class UserProfileService {
  public constructor(
    private readonly axiosInstance: AxiosInstance
  ) {
  }

  /**
   * Get all user profiles.
   *
   * @returns All user profiles.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  public async getUserProfiles(): Promise<AxiosResponse<IUserProfileSnapshotIn[]>> {
    const response = await this.axiosInstance.get(`/user-profiles`);

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
   * Get the user profile with the specified id.
   *
   * @returns The user profile with the specified id.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the user profile was not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  public async getUserProfile(id: string): Promise<AxiosResponse<IUserProfileSnapshotIn>> {
    const response = await this.axiosInstance.get(`/user-profiles/${id}`);

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
   * Get the user profile of the current user.
   *
   * @returns The user profile of the current user.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the user profile was not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  public async getCurrentUserProfile(): Promise<AxiosResponse<IUserProfileSnapshotIn>> {
    const response = await this.axiosInstance.get(`/user-profiles/current`);

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
   * Create the user profile for the currently signed in user.
   *
   * @returns The created user profile.
   * @throws UserProfileAlreadyExistsError If the user profile already exists.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  public async createUserProfile(request: CreateUserProfileRequest): Promise<AxiosResponse<IUserProfileSnapshotIn>> {
    const response = await this.axiosInstance.post(`/user-profiles/`, request);

    switch (response.status) {
      case 200:
        return response;
      case 401:
        throw new UnauthorizedError();
      case 409:
        throw new UserProfileAlreadyExistsError();
      default:
        throw new UnexpectedHttpError();
    }
  }

  /**
   * Delete the currently signed in user and all corresponding data.
   *
   * @returns If the user profile was deleted successful.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the user profile was not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  public async deleteUserProfile(): Promise<AxiosResponse<void>> {
    const response = await this.axiosInstance.delete(`/user-profiles`);

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
   * Update the user profile of the currently signed in user.
   *
   * @returns The updated user profile.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the user profile was not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  public async updateUserProfile(request: UpdateUserProfileRequest): Promise<AxiosResponse<IUserProfileSnapshotIn>> {
    const response = await this.axiosInstance.patch(`/user-profiles`, request);

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
