import { applySnapshot, flow, Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { Flow } from '@wemogy/reactbase';
import { AxiosResponse } from 'axios';
import { IUserProfile, IUserProfileSnapshotIn, UserProfile } from '../models';
import { ApiServiceFactory, CreateUserProfileRequest, UpdateUserProfileRequest } from '../rest';
import { AuthenticationService } from '../authentication';

const UserProfileStore = types.model('UserProfileStore', {
  items: types.array(UserProfile)
}).views((self) => ({
  getUserProfile(id: string): IUserProfile | undefined {
    return self.items.find(x => x.id === id);
  },

  get currentUserProfile(): IUserProfile | undefined {
    if (!AuthenticationService.userId) {
      return;
    }

    return this.getUserProfile(AuthenticationService.userId);
  }

})).actions(self => ({
  /**
   * Get all user profiles.
   *
   * @returns All user profiles.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  queryUserProfiles: flow(function* queryUserProfiles(): Flow<AxiosResponse<IUserProfileSnapshotIn[]>, void> {
    const response = yield ApiServiceFactory.userProfileApi.getUserProfiles();

    applySnapshot(self.items, response.data);
  }),

  /**
   * Get the user profile with the specified id.
   *
   * @returns The user profile with the specified id.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the user profile was not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  queryUserProfile: flow(function* queryUserProfile(id: string): Flow<AxiosResponse<IUserProfileSnapshotIn>, void> {
    const response = yield ApiServiceFactory.userProfileApi.getUserProfile(id);

    const oldUserProfile = self.getUserProfile(response.data.id);

    if (!oldUserProfile) {
      self.items.push(UserProfile.create(response.data));
    } else {
      applySnapshot(oldUserProfile, response.data);
    }
  }),

  /**
   * Get the user profile of the current user.
   *
   * @returns The user profile of the current user.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the user profile was not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  queryCurrentUserProfile: flow(function* queryCurrentUserProfile(): Flow<AxiosResponse<IUserProfileSnapshotIn>, void> {
    const response = yield ApiServiceFactory.userProfileApi.getCurrentUserProfile();

    const oldUserProfile = self.getUserProfile(response.data.id);

    if (!oldUserProfile) {
      self.items.push(UserProfile.create(response.data));
    } else {
      applySnapshot(oldUserProfile, response.data);
    }

    AuthenticationService.userId = response.data.id;
  }),

  /**
   * Create the user profile for the currently signed in user.
   *
   * @returns The created user profile.
   * @throws UserProfileAlreadyExistsError If the user profile already exists.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  createUserProfile: flow(function* createUserProfile(username: string, profileImageUri?: string): Flow<AxiosResponse<IUserProfileSnapshotIn>, IUserProfile> {
    const request = new CreateUserProfileRequest(username, profileImageUri);
    const response = yield ApiServiceFactory.userProfileApi.createUserProfile(request);

    const newUserProfile = UserProfile.create(response.data);
    self.items.push(newUserProfile);
    AuthenticationService.userId = newUserProfile.id;

    return newUserProfile;
  }),

  /**
   * Delete the currently signed in user and all corresponding data.
   *
   * @returns If the user profile was deleted successful.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the user profile was not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  deleteUserProfile: flow(function* deleteUserProfile(): Flow<AxiosResponse<void>, void> {
    yield ApiServiceFactory.userProfileApi.deleteUserProfile();
    AuthenticationService.signOut();
  }),

  /**
   * Update the user profile of the currently signed in user.
   *
   * @returns The updated user profile.
   * @throws UnauthorizedError If the authentication token is not valid.
   * @throws NotFoundError If the user profile was not found.
   * @throws UnexpectedHttpError If an unexpected error occurred while making the API request.
   */
  updateUserProfile: flow(function* updateUserProfile(userProfile: IUserProfile): Flow<AxiosResponse<IUserProfileSnapshotIn>, void> {
    const request = new UpdateUserProfileRequest(userProfile.username, userProfile.profileImageUri, userProfile.rebrickableApiKey);
    const response = yield ApiServiceFactory.userProfileApi.updateUserProfile(request);

    applySnapshot(userProfile, response.data);
    userProfile.rebrickableApiKey = undefined;
    AuthenticationService.userId = userProfile.id;
  })
}));

export default UserProfileStore;

export interface IUserProfileStore extends Instance<typeof UserProfileStore> {
}

export interface IUserProfileStoreSnapshotIn extends SnapshotIn<typeof UserProfileStore> {
}

export interface IUserProfileStoreSnapshotOut extends SnapshotOut<typeof UserProfileStore> {
}
