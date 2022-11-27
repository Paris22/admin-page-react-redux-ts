import { createSlice } from "@reduxjs/toolkit";
import { postCommentsThunk } from "./CommentsThunks";
import { ICommentsInitialState } from "../../models/IComment";

const initialState: ICommentsInitialState = {
  entities: [],
  ids: [],
  loadedCommentsPostIds: [],
  loading: false,
  error: null,
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(postCommentsThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(postCommentsThunk.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      if (action.payload) {
        state.loadedCommentsPostIds.push(action.payload.postId);
        state.entities.push(...action.payload.entities);
        state.ids.push(...action.payload.ids);
      }
    });
    builder.addCase(postCommentsThunk.rejected, (state, action) => {
      state.error = action.error.message || "Something went wrong";
      state.loading = false;
    });
  },
});
