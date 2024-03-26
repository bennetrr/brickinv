import { AxiosInstance, AxiosResponse } from 'axios';
import { IGroupInviteSnapshotIn } from '../../models';
import { CreateGroupInviteRequest } from '../requests';

export default class GroupInviteService {
  public constructor(
    private readonly axiosInstance: AxiosInstance
  ) {
  }

  public async getGroupInvites(): Promise<AxiosResponse<IGroupInviteSnapshotIn[]>> {
    return this.axiosInstance.get(`/group-invites`);
  }

  public async getGroupInvite(id: string): Promise<AxiosResponse<IGroupInviteSnapshotIn>> {
    return this.axiosInstance.get(`/group-invites/${id}`);
  }

  public async createGroupInvite(request: CreateGroupInviteRequest): Promise<AxiosResponse<IGroupInviteSnapshotIn>> {
    return this.axiosInstance.post(`/sets/`, request);
  }

  public async acceptGroupInvite(id: string): Promise<AxiosResponse<void>> {
    return this.axiosInstance.get(`/group-invites/${id}/accept`);
  }

  public async deleteGroupInvite(id: string): Promise<AxiosResponse<void>> {
    return this.axiosInstance.delete(`/group-invites/${id}`);
  }
}
