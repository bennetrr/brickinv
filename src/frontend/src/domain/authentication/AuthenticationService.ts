import { DateTime } from 'luxon';
import _ from 'lodash';
import { axiosInstance } from '../axiosInstance';
import {
  IInvalidCredentialsErrorMessage,
  InvalidCredentialsError,
  UnauthorizedError,
  UnexpectedHttpError
} from '../exceptions';

const log = (...msg: any[]) => console.log('AuthenticationService:', ...msg);

export type OnTokenChangeCallback = (token: string | undefined) => void;
export type OnUserIdChangeCallback = (userId: string | undefined) => void;

class AuthenticationService {
  private _accessToken?: string;
  private _refreshToken?: string;
  private _expiresAt?: DateTime;
  private _refreshTimeoutId?: NodeJS.Timeout;
  private _onTokenChangeCallbacks: OnTokenChangeCallback[] = [];

  /**
   * Get the access token.
   */
  public get accessToken(): string | undefined {
    return this._accessToken;
  }

  /**
   * Return whether a user is authenticated.
   */
  public get isAuthenticated(): boolean {
    if (!this._accessToken || !this._expiresAt) {
      return false;
    }

    return this._expiresAt >= DateTime.local();
  }

  /**
   * Initialize the authentication service by trying to retrieve the token from the local storage and refresh the token.
   */
  public async initialize(): Promise<void> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const expiresAt = localStorage.getItem('expiresAt');

    if (!accessToken || !refreshToken || !expiresAt) {
      this.signOut();
      return;
    }

    this.setToken(
      accessToken,
      refreshToken,
      DateTime.fromISO(expiresAt)
    );

    await this.refresh();
  }

  /**
   * Create an account with the given credentials.
   *
   * @param email The email address of the user.
   * @param password The password of the user.
   * @throws InvalidCredentialsError If the credentials were invalid.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  public async signUp(email: string, password: string): Promise<void> {
    const response = await axiosInstance.post('/auth/register', { email, password });

    switch (response.status) {
      case 200:
        log('Sign-up successful (%i): %O', response.status, response);
        return;
      case 400:
        log('Sign-up failed (%i): %O', response.status, response);

        const errors = response.data.errors as { [key: string]: string };
        const errorMessages: IInvalidCredentialsErrorMessage[] = [];

        for (const errorElement in errors) {
          errorMessages.push({ id: errorElement, message: errors[errorElement] });
        }

        throw new InvalidCredentialsError(errorMessages);
      default:
        log('Sign-up failed (%i): %O', response.status, response);
        throw new UnexpectedHttpError();
    }
  }

  /**
   * Sign in with the given credentials.
   *
   * @param email The email address of the user.
   * @param password The password of the user.
   * @throws UnauthorizedError If the credentials were invalid.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  public async signIn(email: string, password: string): Promise<void> {
    const response = await axiosInstance.post('/auth/login', { email, password });

    switch (response.status) {
      case 200:
        log('Sign-in successful (%i): %O', response.status, response);

        this.setToken(
          response.data.accessToken,
          response.data.refreshToken,
          DateTime.now().plus({ seconds: response.data.expiresIn })
        );
        this.scheduleRefresh(response.data.expiresIn);
        return;
      case 401:
        log('Sign-in failed (%i): %O', response.status, response);
        throw new UnauthorizedError();
      default:
        log('Sign-in failed (%i): %O', response.status, response);
        throw new UnexpectedHttpError();
    }
  }

  /**
   * Sign the current user out by removing the tokens.
   */
  public signOut(): void {
    this.setToken(undefined, undefined, undefined);
  }

  /**
   * Register a callback function that is executed whenever the access token changes.
   */
  public registerTokenChangeHandler(callback: OnTokenChangeCallback): void {
    this._onTokenChangeCallbacks.push(callback);
  }

  /**
   * Unregister a callback function that is registered.
   */
  public unregisterTokenChangeHandler(callback: OnTokenChangeCallback): void {
    _.remove<OnTokenChangeCallback>(this._onTokenChangeCallbacks, callback);
  }

  /**
   * Confirm the user's email address by sending the code to the API.
   *
   * @param userId The user's ID.
   * @param code The code sent to the user per email.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  public async confirmEmail(userId: string, code: string): Promise<void> {
    const response = await axiosInstance.get('/auth/confirmEmail', { params: { userId, code } });

    if (response.status === 200) {
      log('Email confirmation successful (%i): %O', response.status, response);
      return;
    }

    log('Email confirmation failed (%i): %O', response.status, response);
    throw new UnexpectedHttpError();
  }

  /**
   * Request a password reset email to be sent to the given email address.
   *
   * @param email The user's email.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  public async requestPasswordReset(email: string): Promise<void> {
    const response = await axiosInstance.post('/auth/forgotPassword', { email });

    if (response.status === 200) {
      log('Password reset request successful (%i): %O', response.status, response);
      return;
    }

    log('Password reset request failed (%i): %O', response.status, response);
    throw new UnexpectedHttpError();
  }

  /**
   * Reset the password for the given user using the information that the user received via email.
   *
   * @param email The user's ID.
   * @param resetCode The reset code from the email.
   * @param newPassword The new password.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  public async resetPassword(email: string, resetCode: string, newPassword: string): Promise<void> {
    const response = await axiosInstance.post('/auth/resetPassword', { email, resetCode, newPassword });

    if (response.status === 200) {
      log('Password reset successful (%i): %O', response.status, response);
      return;
    }

    log('Password reset failed (%i): %O', response.status, response);
    throw new UnexpectedHttpError();
  }

  /**
   * Refresh the access token.
   *
   * @private
   */
  private async refresh(): Promise<void> {
    const response = await axiosInstance.post('/auth/refresh', { refreshToken: this._refreshToken });

    if (response.status !== 200) {
      log('Refresh failed (%i): %O', response.status, response);
      this.signOut();
      return;
    }

    log('Refresh successful (%i): %O', response.status, response);
    this.setToken(
      response.data.accessToken,
      response.data.refreshToken,
      DateTime.now().plus({ seconds: response.data.expiresIn })
    );

    this.scheduleRefresh(response.data.expiresIn);
  }

  /**
   * Schedule a refresh of the access token in the given time.
   *
   * @param timeout The timeout in seconds.
   * @private
   */
  private scheduleRefresh(timeout: number): void {
    this._refreshTimeoutId = setTimeout(() => this.refresh(), timeout * 1000);
  }

  /**
   * Set the tokens to the new values. If at least one of the values is `undefined`, the user is logged out.
   *
   * @private
   */
  private setToken(accessToken?: string, refreshToken?: string, expiresAt?: DateTime): void {
    this._accessToken = accessToken;
    this._refreshToken = refreshToken;
    this._expiresAt = expiresAt;

    if (!this._accessToken || !this._refreshToken || !this._expiresAt) {
      log('Logged out');

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('expiresAt');

      clearTimeout(this._refreshTimeoutId);
    } else {
      const expiresAtIso = this._expiresAt.toISO();
      if (!expiresAtIso) {
        this.signOut();
        return;
      }

      log('New token expires at %s', expiresAtIso);

      localStorage.setItem('accessToken', this._accessToken);
      localStorage.setItem('refreshToken', this._refreshToken);
      localStorage.setItem('expiresAt', expiresAtIso);
    }

    this._onTokenChangeCallbacks.forEach(callback => callback(accessToken));
  }
}

export default new AuthenticationService();
