import { AxiosInstance, AxiosResponse } from 'axios';
import { IUserProfileSnapshotIn } from '../../models';
import { CreateUserProfileRequest, UpdateUserProfileRequest } from '../requests';

export default class UserProfileService {
  public constructor(
    private readonly axiosInstance: AxiosInstance
  ) {
  }

  public async getUserProfiles(): Promise<AxiosResponse<IUserProfileSnapshotIn[]>> {
    return this.axiosInstance.get(`/user-profiles`);
  }

  public async getUserProfile(id: string): Promise<AxiosResponse<IUserProfileSnapshotIn>> {
    return this.axiosInstance.get(`/user-profiles/${id}`);
  }

  public async getCurrentUserProfile(): Promise<AxiosResponse<IUserProfileSnapshotIn>> {
    return this.axiosInstance.get(`/user-profiles/current`);
  }

  public async createUserProfile(request: CreateUserProfileRequest): Promise<AxiosResponse<IUserProfileSnapshotIn>> {
    return this.axiosInstance.post(`/user-profiles/`, request);
  }

  public async updateUserProfile(request: UpdateUserProfileRequest): Promise<AxiosResponse<IUserProfileSnapshotIn>> {
    return this.axiosInstance.patch(`/user-profiles`, request);
  }

  public async deleteUserProfile(): Promise<AxiosResponse<void>> {
    return this.axiosInstance.delete(`/user-profiles`);
  }
}
