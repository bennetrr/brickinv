import { axiosInstance } from '$/domain/axiosInstance/AxiosInstance.ts';

class AuthenticationService {
  public async register(email: string, password: string): Promise<'success' | 'error' | string[] > {  // TODO: Better type for error.
    const response = await axiosInstance.post('/auth/register', { email, password });

    switch (response.status) {
      case 200:
        return 'success';
      case 400:
        const errors: string[] = [];
        for (const errorElement in (response.data.errors as object)) {
          errors.push(response.data.errors[errorElement]);
        }
        return errors;
      default:
        return 'error';
    }
  }
  
  /**
   * Login to the application.
   * 
   * @param email The email address of the user.
   * @param password The password of the user.
   * @return success: The user has been logged in successfully.
   * @return unauthorized: The user has not been logged in because the credentials are invalid.
   * @return error: The user has not been logged in because of an error.
   */
  public async login(email: string, password: string): Promise<'success' | 'unauthorized' | 'error'> {
    const response = await axiosInstance.post('/auth/login', { email, password });

    switch (response.status) {
      case 200:
        return 'success';
      case 401:
        return 'unauthorized';
      default:
        return 'error';
    }
  }
}

export default new AuthenticationService();
