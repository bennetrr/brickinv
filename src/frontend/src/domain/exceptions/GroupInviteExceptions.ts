/**
 * Raised if the user tries to invite itself to a group.
 */
export class InvitingSelfError extends Error {

}

/**
 * Raised if the user tries to invite a user that is already a member of the group.
 */
export class InvitingMemberError extends Error {

}
