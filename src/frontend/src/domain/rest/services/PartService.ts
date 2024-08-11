import { AxiosInstance, AxiosResponse } from 'axios';
import { IPartSnapshotIn } from '../../models';
import { UpdatePartRequest } from '../requests';
import { UpdatePartResponse } from '../responses';
import { NotFoundError, PresentCountOutOfRangeError, UnauthorizedError, UnexpectedHttpError } from '../../exceptions';

export default class PartService {
  public constructor(private readonly axiosInstance: AxiosInstance) {}

  /**
   * Get all parts of the specified set.
   *
   * @returns All parts of the specified set.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the set was not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  public async getParts(setId: string): Promise<AxiosResponse<IPartSnapshotIn[]>> {
    const response = await this.axiosInstance.get(`/sets/${setId}/parts`);

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
   * Get the part with the specified id.
   *
   * @returns The part with the specified id.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the set or the part was not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  public async getPart(setId: string, id: string): Promise<AxiosResponse<IPartSnapshotIn>> {
    const response = await this.axiosInstance.get(`/sets/${setId}/parts/${id}`);

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
   * Update the part with the specified id.
   *
   * @returns The updated part and set.
   * @throws PresentCountOutOfRangeError If the updated present count of a part is not between 0 and the total count.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the group or the recipient are not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  public async updatePart(
    setId: string,
    id: string,
    request: UpdatePartRequest
  ): Promise<AxiosResponse<UpdatePartResponse>> {
    const response = await this.axiosInstance.patch(`/sets/${setId}/parts/${id}`, request);

    switch (response.status) {
      case 202:
        return response;
      case 400:
        switch (response.data) {
          case 'presentCountOutOfRange':
            throw new PresentCountOutOfRangeError();
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
}
