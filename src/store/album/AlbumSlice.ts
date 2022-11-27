import { createSlice } from "@reduxjs/toolkit";
import { IAlbumInitialState } from "../../models/IAlbum";
import { albumsThunk, albumByIdThunk } from "./AlbumThunks";

const initialState: IAlbumInitialState = {
  entities: [],
  ids: [],
  albumLoading: [],
  loading: false,
  error: null,
};

export const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(albumsThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(albumByIdThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
      });
    builder
      .addCase(albumsThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        if (action.payload) {
          state.entities = state.entities.concat(action.payload.entities);
          state.ids = state.ids.concat(action.payload.ids);
        }
      })
      .addCase(albumByIdThunk.fulfilled, (state, action) => {
        state.error = null;
        if (action.payload?.entity && action.payload.id) {
          state.entities.push(action.payload.entity);
          state.ids.push(action.payload.id);
        }
        state.loading = false;
      });
    builder
      .addCase(albumsThunk.rejected, (state, action) => {
        state.error = action.error.message || "Something went wrong";
        state.loading = false;
      })
      .addCase(albumByIdThunk.rejected, (state, action) => {
        state.error = action.error.message || "Something went wrong";
        state.albumLoading.filter((id) => id !== action.payload);
      });
  },
});
