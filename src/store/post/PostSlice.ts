import { createSlice } from "@reduxjs/toolkit";
import { postByIdThunk, postsThunk } from "./PostThunks";
import { IPostInitialState } from "../../models/IPost";

const initialState: IPostInitialState = {
  entities: [],
  ids: [],
  postLoading: [],
  loading: false,
  error: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postsThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(postByIdThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
      });

    builder
      .addCase(postsThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.entities = action.payload.entities;
        state.ids = action.payload.ids;
      })
      .addCase(postByIdThunk.fulfilled, (state, action) => {
        state.error = null;
        if (action.payload?.entity && action.payload.id) {
          state.entities.push(action.payload.entity);
          state.ids.push(action.payload.id);
        }
        state.loading = false;
      });

    builder
      .addCase(postsThunk.rejected, (state, action) => {
        state.error = action.error.message || "Something went wrong";
        state.loading = false;
      })
      .addCase(postByIdThunk.rejected, (state, action) => {
        state.error = action.error.message || "Something went wrong";
        state.postLoading.filter((id) => id !== action.payload);
      });
  },
});
