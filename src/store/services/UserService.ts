import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IUser, IUserAuthorization, IToken } from 'models';
import { Decoder } from '../../utils/Decoder';
import { removeUser, setId, setToken } from '../slices/UserSlice';
import { commonApi } from './common.api';

export const userAPI = commonApi.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `/user/${id}`,
    }),
    regUser: build.mutation<IUser, IUserAuthorization>({
      query: (userInfo) => ({
        url: `/signup`,
        method: 'POST',
        body: userInfo,
      }),
      async onQueryStarted({ password }, { dispatch, queryFulfilled }) {
        try {
          const resultID = await queryFulfilled;
          dispatch(setId(resultID.data.id));
        } catch (e) {
          console.error('userApi Registration error', e);
        }
      },
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
          dispatch(setToken(resultToken.data.token));
          const ID = Decoder(resultToken.data.token);
          dispatch(setId(ID));
        } catch (e) {
          console.error('userApi Authorization error', e);
        }
      },
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'User' }],
    }),
  }),
});

export const { useGetUserQuery, useRegUserMutation, useAuthorizationUserMutation } = userAPI;
