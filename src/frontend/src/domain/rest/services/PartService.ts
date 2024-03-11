import { AxiosInstance, AxiosResponse } from 'axios';
import { IPartSnapshotIn } from '../../models';
import { UpdatePartRequest } from '../requests';
import { UpdatePartResponse } from '../responses';


export default class PartService {
  public constructor(
    private readonly axiosInstance: AxiosInstance
  ) {
  }

  public async updatePart(setId: string, id: string, request: UpdatePartRequest): Promise<AxiosResponse<UpdatePartResponse>> {
    return this.axiosInstance.put(`/sets/${setId}/parts/${id}`, request);
  }

  public async getParts(setId: string): Promise<AxiosResponse<IPartSnapshotIn[]>> {
    return this.axiosInstance.get(`/sets/${setId}/parts`);
  }

  public async getPart(setId: string, id: string): Promise<AxiosResponse<IPartSnapshotIn>> {
    return this.axiosInstance.get(`/sets/${setId}/parts/${id}`);
  }
}
