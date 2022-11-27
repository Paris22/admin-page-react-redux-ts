import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { albumsSlice } from "./album/AlbumSlice";
import { postsSlice } from "./post/PostSlice";
import { photosSlice } from "./photo/PhotosSlice";
import { commentsSlice } from "./comment/CommentsSlice";
import { todosSlice } from "./todo/TodosSlice";

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

const rootReducer = combineReducers({
  albums: albumsSlice.reducer,
  posts: postsSlice.reducer,
  photos: photosSlice.reducer,
  comments: commentsSlice.reducer,
  todos: todosSlice.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
