import axios, { AxiosInstance } from 'axios';
import { Clerk } from '@clerk/clerk-js';
import { PartService, SetService } from './services';

class ApiServiceFactory {
  private readonly clerk: Clerk;
  private readonly axiosInstance: AxiosInstance;

  public constructor() {
    this.clerk = new Clerk(window.env.clerkPublishableKey);
    void this.clerk.load();

    this.axiosInstance = axios.create({
      validateStatus: () => true,
      baseURL: window.env.apiBaseUrl
    });

    this.axiosInstance.interceptors.request.use(async config => {
      const token = await this.clerk.session?.getToken();
      config.headers.Authorization = `Bearer ${token}`;
      return config;
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
