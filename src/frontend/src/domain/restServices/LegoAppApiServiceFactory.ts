import { AxiosInstance } from 'axios';
import { axiosInstance } from '$/domain';
import LegoSetService from './LegoSetService';

class LegoAppApiServiceFactory {
  private readonly axiosInstance: AxiosInstance;

  public constructor() {
    this.axiosInstance = axiosInstance;
  }

  public get legoSetApi(): LegoSetService {
    return new LegoSetService(this.axiosInstance);
  }
}

export default new LegoAppApiServiceFactory();
