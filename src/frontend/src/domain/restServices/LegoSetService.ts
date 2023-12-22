import { AxiosInstance, AxiosResponse } from 'axios';
import { ILegoSetSnapshotIn } from '$/domain';

export default class LegoSetService {
  public constructor(private readonly axiosInstance: AxiosInstance) {}

  public async createLegoSet(setId: string, forSale: boolean): Promise<AxiosResponse<ILegoSetSnapshotIn>> {
    return this.axiosInstance.post(`/sets/`, { setId, forSale });
  }

  // public async updateLegoSet(
  //     basePath: string,
  //     id: string,
  //     request: UpdateResourceTypeRequest
  // ): Promise<AxiosResponse<IResourceTypeSnapshotIn>> {
  //   return this.axiosInstance.put(`${basePath}/resource-types/${id}`, request);
  // }

  public async deleteLegoSet(id: string): Promise<AxiosResponse<void>> {
    return this.axiosInstance.delete(`/sets/${id}`);
  }

  public async getLegoSets(): Promise<AxiosResponse<ILegoSetSnapshotIn[]>> {
    return this.axiosInstance.get(`/sets`);
  }

  public async getLegoSet(id: string): Promise<AxiosResponse<ILegoSetSnapshotIn>> {
    return this.axiosInstance.get(`/sets/${id}`);
  }
}
