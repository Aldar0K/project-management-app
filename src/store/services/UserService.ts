import { IUser } from 'models';
import { commonApi } from './common.api';

export const UsersAPI = commonApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query<IUser[], void>({
      query: () => ({ url: `/users/` }),
      // providesTags: (result) => ['User'],
    }),

    getUserById: build.query<IUser, string>({
      query: (id) => ({ url: `users/${id}` }),
    }),
  }),
});
