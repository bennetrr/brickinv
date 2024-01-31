import axios from 'axios';
import { AuthenticationService } from '$/domain/authentication';

export const axiosInstance = axios.create({
  validateStatus: () => true,
  headers: {
    common: {
      Authorization: undefined
    }
  }
});

AuthenticationService.addTokenChangeHandler(token => {
  axiosInstance.defaults.headers.common.Authorization = token ? `Bearer ${token}` : undefined;
});

export function setupAxiosInstance(baseUrl: string) {
  axiosInstance.defaults.baseURL = baseUrl;
}
