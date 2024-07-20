/**
 * Raised when the updated present count of a part is not between 0 and the total count.
 */
export class PresentCountOutOfRangeError extends Error {

}

/**
 * Raised when the Rebrickable API key is invalid.
 */
export class RebrickableApiKeyInvalidError extends Error {

}

/**
 * Raised when the set was not found on Rebrickable.
 */
export class RebrickableSetNotFoundError extends Error {

}
