import { AxiosInstance } from 'axios';
import { axiosInstance } from '../axiosInstance';
import { GroupInviteService, GroupService, PartService, SetService, UserProfileService } from './services';

class ApiServiceFactory {
  private readonly axiosInstance: AxiosInstance;

  public constructor() {
    this.axiosInstance = axiosInstance;
  }

  public get groupInviteApi(): GroupInviteService {
    return new GroupInviteService(this.axiosInstance);
  }

  public get groupApi(): GroupService {
    return new GroupService(this.axiosInstance);
  }

  public get setApi(): SetService {
    return new SetService(this.axiosInstance);
  }

  public get partApi(): PartService {
    return new PartService(this.axiosInstance);
  }

  public get userProfileApi(): UserProfileService {
    return new UserProfileService(this.axiosInstance);
  }
}

export default new ApiServiceFactory();
