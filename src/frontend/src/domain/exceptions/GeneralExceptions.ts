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
