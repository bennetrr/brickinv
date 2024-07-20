/**
 * An error message as returned by the ASP.NET Core Identity register endpoint.
 */
export interface IInvalidCredentialsErrorMessage {
  id: string;
  message: string;
}

/**
 * Raised when the user has provided invalid credentials, such as a password that is too short.
 */
export class InvalidCredentialsError extends Error {
  public messages: IInvalidCredentialsErrorMessage[];

  /**
   * Raised when the user has provided invalid credentials, such as a password that is too short.
   *
   * @param messages A list of error messages as returned by the ASP.NET Core Identity register endpoint.
   */
  constructor(messages: IInvalidCredentialsErrorMessage[]) {
    super();
    this.messages = messages;
  }
}

/**
 * Raised when the user is not authorized and tries to access a resource.
 * Equivalent to HTTP 401.
 */
export class UnauthorizedError extends Error {

}

/**
 * Raised when the user tries to access or modify a resource without permission.
 */
export class InsufficientPermissionsError extends Error {

}

/**
 * Raised if the user profile for the current user was not found.
 */
export class UserProfileNotFoundError extends Error {

}

/**
 * Raised if the user profile create function is called, but the user already has a profile.
 */
export class UserProfileAlreadyExistsError extends Error {

}
