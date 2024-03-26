import { AxiosInstance, AxiosResponse } from 'axios';
import { IGroupSnapshotIn } from '../../models';
import { CreateGroupRequest, UpdateGroupRequest } from '../requests';

export default class GroupService {
  public constructor(
    private readonly axiosInstance: AxiosInstance
  ) {
  }

  public async getGroups(): Promise<AxiosResponse<IGroupSnapshotIn[]>> {
    return this.axiosInstance.get(`/groups`);
  }

  public async getGroup(id: string): Promise<AxiosResponse<IGroupSnapshotIn>> {
    return this.axiosInstance.get(`/groups/${id}`);
  }

  public async createGroup(request: CreateGroupRequest): Promise<AxiosResponse<IGroupSnapshotIn>> {
    return this.axiosInstance.post(`/groups/`, request);
  }

  public async updateGroup(id: string, request: UpdateGroupRequest): Promise<AxiosResponse<IGroupSnapshotIn>> {
    return this.axiosInstance.patch(`/groups/${id}`, request);
  }

  public async deleteGroup(id: string): Promise<AxiosResponse<void>> {
    return this.axiosInstance.delete(`/groups/${id}`);
  }
}
