import { IUser, IUserAuthorization, IToken, IUserUpdate } from 'models';
import { Decoder } from '../../utils/Decoder';
import { setAllUser, setId, setLogin, setName, setToken } from '../slices/UserSlice';
import { commonApi } from './common.api';

export const AuthorizationAPI = commonApi.injectEndpoints({
  endpoints: (build) => ({
    regUser: build.mutation<IUser, IUserAuthorization>({
      query: (userInfo) => ({
        url: `/auth/signup`,
        method: 'POST',
        body: userInfo,
      }),
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        try {
          const resultID = await queryFulfilled;
          dispatch(setId(resultID.data._id));
        } catch (e) {
          console.error('userApi Registration error', e);
        }
      },
    }),
    authorizationUser: build.mutation<IToken, IUserAuthorization>({
      query: (userInfo) => ({
        url: `/auth/signin`,
        method: 'POST',
        body: userInfo,
      }),
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        try {
          const resultToken = await queryFulfilled;
          dispatch(setToken(resultToken.data.token));
          localStorage.setItem('token', resultToken.data.token);
          const userDecodedInfo = Decoder(resultToken.data.token);
          dispatch(setId(userDecodedInfo.id));
        } catch (e) {
          console.error('userApi Authorization error', e);
        }
      },
    }),
    updateUser: build.mutation<IUser, IUserUpdate>({
      query: ({ id, body }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body: body,
      }),
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setId(result.data._id));
          dispatch(setName(result.data.name));
        } catch (e) {
          console.error('userApi Update user error', e);
        }
      },
    }),
    getUserById: build.query<IUser, string>({
      query: (id) => ({ url: `users/${id}` }),
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setName(result.data.name));
          dispatch(setLogin(result.data.login));
        } catch (e) {
          console.error('userApi getByID error', e);
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
    getAllUsers: build.query<IUser[], void>({
      query: () => ({ url: `/users/` }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setAllUser(result.data));
        } catch (e) {
          console.error('userApi getAllUsers error', e);
        }
      },
      providesTags: (result) => ['Users'],
    }),
  }),
});
