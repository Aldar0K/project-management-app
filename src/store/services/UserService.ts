import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export interface IUser {
  name?: string;
  login: string;
  id: string;
}
export interface IUserAuthorization {
  name?: string;
  login: string;
  password: string;
}

export interface IToken {
  token: string;
}
export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://protected-dusk-84289.herokuapp.com' }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    getUser: build.query({
      query: () => '/',
    }),
    regUser: build.mutation<IUser, IUserAuthorization>({
      query: (userInfo) => ({
        url: `/signup`,
        method: 'POST',
        body: userInfo,
      }),
      invalidatesTags: [{ type: 'User' }],
    }),
    authorizationUser: build.mutation<IToken, IUserAuthorization>({
      query: (userInfo) => ({
        url: `/signin`,
        method: 'POST',
        body: userInfo,
      }),
      async onQueryStarted({ password }, { dispatch, queryFulfilled }) {
        try {
          const resultToken = await queryFulfilled;
          // dispatch(setEntityAction(resultToken.data));
        } catch (e) {
          console.error('userApi createUser error', e);
        }
      },
    }),
  }),
});

export const { useGetUserQuery, useRegUserMutation, useAuthorizationUserMutation } = userAPI;
