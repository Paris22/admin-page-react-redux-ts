import { createSlice } from "@reduxjs/toolkit";
import { albumPhotosThunk } from "./PhotosThunks";
import { IPhotosInitialState } from "../../models/IPhoto";

const initialState: IPhotosInitialState = {
  entities: [],
  ids: [],
  loadedPhotosAlbumIds: [],
  loading: false,
  error: null,
  success: false,
};

export const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(albumPhotosThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(albumPhotosThunk.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      if (action.payload) {
        state.loadedPhotosAlbumIds.push(action.payload.albumId);
        state.entities.push(...action.payload.entities);
        state.ids.push(...action.payload.ids);
      }
    });
    builder.addCase(albumPhotosThunk.rejected, (state, action) => {
      state.error = action.error.message || "Something went wrong";
      state.loading = false;
    });
  },
});
