import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { IPostEntity } from "../../models/IPost";
import { Urls } from "../../constants/urls";

export const postByIdThunk = createAsyncThunk(
  "posts/postByIdThunk",
  async (postId: string | number, { getState }) => {
    const response = (await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    )) as any;

    const state = getState() as RootState;

    if (state.posts.ids.some((id) => id === postId)) return;

    let id: number | null = null;
    let entity: IPostEntity | null = null;

    if (response.data) {
      id = response.data.id as number;
      entity = response.data as IPostEntity;
    }

    return { id, entity };
  }
);

export const postsThunk = createAsyncThunk("posts/postsThunk", async () => {
  const response = (await axios.get(Urls.POSTS_URL)) as any;

  let ids: number[] = [];
  let entities: IPostEntity[] = [];

  if (response.data && response.data.length) {
    ids = response.data.reduce((acc: number[], item: IPostEntity) => {
      acc.push(item.id);
      return acc;
    }, []);

    entities = response.data;
  }

  return { ids, entities };
});
