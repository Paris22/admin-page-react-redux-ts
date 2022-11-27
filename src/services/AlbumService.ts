//RTK query для серверной части

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Urls } from "../constants/urls";
import { IAlbumInitialState } from "../models/IAlbum";

export const albumsAPI = createApi({
  reducerPath: "albumAPI",
  baseQuery: fetchBaseQuery({ baseUrl: Urls.BASE_URL }),
  endpoints: (build) => ({
    fetchAllAlbums: build.query<IAlbumInitialState[], number>({
      query: (limit: number = 100) => ({
        url: `/users/1/albums`,
        params: {
          _limit: limit,
        },
      }),
    }),
    createAlbum: build.mutation<
      IAlbumInitialState,
      Partial<IAlbumInitialState>
    >({
      query: (album) => ({
        url: `/users/1/albums`,
        method: "POST",
        body: album,
      }),
    }),
  }),
});
