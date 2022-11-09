import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://protected-dusk-84289.herokuapp.com' }),
  endpoints: (build) => ({
    getUser: build.query<string, string>({
      query: () => '/',
    }),
  }),
});

export const { useGetUserQuery } = userAPI;
