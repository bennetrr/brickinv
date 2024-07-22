import axios, { AxiosInstance } from 'axios';
import { PartService, SetService } from './services';

class ApiServiceFactory {
  public readonly axiosInstance: AxiosInstance;

  public constructor() {
    this.axiosInstance = axios.create({
      validateStatus: () => true,
      baseURL: window.env.apiBaseUrl
    });
  }

  public get setApi(): SetService {
    return new SetService(this.axiosInstance);
  }

  public get partApi(): PartService {
    return new PartService(this.axiosInstance);
  }
}

export default new ApiServiceFactory();
