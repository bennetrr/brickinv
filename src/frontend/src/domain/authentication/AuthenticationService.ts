import { DateTime } from 'luxon';
import _ from 'lodash';
import debug from 'debug';
import { axiosInstance } from '$/domain/axiosInstance';

const log = debug('App.AuthenticationService');

type OnTokenChangeCallback = (token: string | undefined) => void;

class AuthenticationService {
  private _refreshToken: string | undefined;
  private _expiresAt: DateTime | undefined;
  private _refreshTimeoutId: NodeJS.Timeout | undefined;
  private _onTokenChangeCallbacks: OnTokenChangeCallback[] = [];

  private _accessToken: string | undefined;

  public get accessToken(): string | undefined {
    return this._accessToken;
  }

  public get isAuthenticated(): boolean {
    if (!this._accessToken || !this._expiresAt) {
      return false;
    }

    return this._expiresAt >= DateTime.local();
  }

  public initialize(): void {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const expiresAt = localStorage.getItem('expiresAt');

    if (!accessToken || !refreshToken || !expiresAt) {
      this.logout();
      return;
    }

    this.setToken(
        accessToken,
        refreshToken,
        DateTime.fromISO(expiresAt)
    );

    if (DateTime.fromISO(expiresAt) < DateTime.now()) {
      void this.refresh();
      return;
    }

    this.scheduleRefresh(DateTime.fromISO(expiresAt).diffNow('seconds').seconds);
  }

  public async register(email: string, password: string): Promise<'success' | 'error' | string[]> {  // TODO: Better type for error.
    const response = await axiosInstance.post('/auth/register', { email, password });

    switch (response.status) {
      case 200:
        log('Registration successful (%i): %O', response.status, response);
        return 'success';
      case 400:
        log('Registration failed (%i): %O', response.status, response);

        const errors: string[] = [];
        for (const errorElement in (response.data.errors as object)) {
          errors.push(response.data.errors[errorElement]);
        }
        return errors;
      default:
        log('Registration successful (%i): %O', response.status, response);
        return 'error';
    }
  }

  public async login(email: string, password: string): Promise<'success' | 'unauthorized' | 'error'> {
    const response = await axiosInstance.post('/auth/login', { email, password });

    switch (response.status) {
      case 200:
        log('Login successful (%i): %O', response.status, response);

        this.setToken(
            response.data.accessToken,
            response.data.refreshToken,
            DateTime.now().plus({ seconds: response.data.expiresIn })
        );
        this.scheduleRefresh(response.data.expiresIn);
        return 'success';
      case 401:
        log('Login failed (%i): %O', response.status, response);
        return 'unauthorized';
      default:
        log('Login failed (%i): %O', response.status, response);
        return 'error';
    }
  }

  public logout(): void {
    this.setToken(undefined, undefined, undefined);
  }

  public addTokenChangeHandler(callback: OnTokenChangeCallback): void {
    this._onTokenChangeCallbacks.push(callback);
  }

  public removeTokenChangeHandler(callback: OnTokenChangeCallback): void {
    _.remove<OnTokenChangeCallback>(this._onTokenChangeCallbacks, callback);
  }

  private async refresh(): Promise<void> {
    const response = await axiosInstance.post('/auth/refresh', { refreshToken: this._refreshToken });

    if (response.status !== 200) {
      log('Refresh failed (%i): %O', response.status, response);
      this.logout();
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
   * Schedules a refresh of the access token.
   *
   * @param timeout The timeout in seconds.
   * @private
   */
  private scheduleRefresh(timeout: number): void {
    this._refreshTimeoutId = setTimeout(() => this.refresh(), timeout * 1000);
  }

  private setToken(accessToken: string | undefined, refreshToken: string | undefined, expiresAt: DateTime | undefined): void {
    this._accessToken = accessToken;
    this._refreshToken = refreshToken;
    this._expiresAt = expiresAt;

    if (!!this._accessToken && !!this._refreshToken && !!this._expiresAt) {
      log('New token expires at %s', this._expiresAt!.toISO());

      localStorage.setItem('accessToken', this._accessToken);
      localStorage.setItem('refreshToken', this._refreshToken);
      localStorage.setItem('expiresAt', this._expiresAt.toISO()!);
    } else {
      log('Logged out');

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('expiresAt');
      clearTimeout(this._refreshTimeoutId!);
    }

    this._onTokenChangeCallbacks.forEach(callback => callback(accessToken));
  }
}

export default new AuthenticationService();
