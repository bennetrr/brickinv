import { AxiosInstance, AxiosResponse } from 'axios';
import { ISetSnapshotIn } from '../../models';
import { CreateSetRequest, UpdateSetRequest } from '../requests';

export default class SetService {
  public constructor(
    private readonly axiosInstance: AxiosInstance
  ) {
  }

  public async createSet(request: CreateSetRequest): Promise<AxiosResponse<ISetSnapshotIn>> {
    return this.axiosInstance.post(`/sets/`, request);
  }

  public async updateSet(id: string, request: UpdateSetRequest): Promise<AxiosResponse<ISetSnapshotIn>> {
    return this.axiosInstance.put(`/sets/${id}`, request);
  }

  public async deleteSet(id: string): Promise<AxiosResponse<void>> {
    return this.axiosInstance.delete(`/sets/${id}`);
  }

  public async getSets(): Promise<AxiosResponse<ISetSnapshotIn[]>> {
    return this.axiosInstance.get(`/sets`);
  }

  public async getSet(id: string): Promise<AxiosResponse<ISetSnapshotIn>> {
    return this.axiosInstance.get(`/sets/${id}`);
  }
}
