import { AxiosInstance } from 'axios';
import { axiosInstance } from '../axiosInstance';
import { PartService, SetService } from './services';

class ApiServiceFactory {
  private readonly axiosInstance: AxiosInstance;

  public constructor() {
    this.axiosInstance = axiosInstance;
  }

  public get setApi(): SetService {
    return new SetService(this.axiosInstance);
  }

  public get partApi(): PartService {
    return new PartService(this.axiosInstance);
  }
}

export default new ApiServiceFactory();
