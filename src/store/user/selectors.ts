import { RootState } from '../store';

export const selectUserProfile = (state: RootState) => state.user.profile;
export const selectUserAddress = (state: RootState) => state.user.address;
export const selectUserIsLoading = (state: RootState) => state.user.isLoading;
export const selectUserError = (state: RootState) => state.user.error;
