import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { IError } from 'models';

import { RootState } from 'store/store';

// TODO move to constants.
export const BASE_URL = 'https://pma-backend-2-0.onrender.com';
// export const BASE_URL = 'https://protected-dusk-84289.herokuapp.com';

export const commonApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    IError,
    Record<string, unknown>,
    FetchBaseQueryMeta
  >,
  tagTypes: ['User', 'Users', 'Board', 'BoardList', 'Column', 'Task'],
  endpoints: (_) => ({}),
});
