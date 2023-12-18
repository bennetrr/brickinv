import axios from 'axios';

export const axiosInstance = axios.create({
  validateStatus: () => true,
  headers: {
    common: {
      Authorization: undefined,
    }
  }
});

export function setupAxiosInstance(baseUrl: string) {
  axiosInstance.defaults.baseURL = baseUrl;
}
