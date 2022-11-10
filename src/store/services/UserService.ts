import { IUser, IUserAuthorization, IToken } from 'models';
import { Decoder } from '../../utils/Decoder';
import { setId, setLogin, setToken } from '../slices/UserSlice';
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
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
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
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        try {
          const resultToken = await queryFulfilled;
          dispatch(setToken(resultToken.data.token));
          localStorage.setItem('token', resultToken.data.token);
          const userDecodedInfo = Decoder(resultToken.data.token);
          dispatch(setId(userDecodedInfo.userId));
          dispatch(setLogin(userDecodedInfo.login));
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
