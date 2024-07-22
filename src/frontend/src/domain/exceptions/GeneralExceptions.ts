/**
 * Raised when an HTTP status code that is not documented was received.
 */
export class UnexpectedHttpError extends Error {

}

/**
 * Raised when the user tries to access or modify a resource that does not exist.
 * Equivalent to HTTP 404.
 */
export class NotFoundError extends Error {

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
