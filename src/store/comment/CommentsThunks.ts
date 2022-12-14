import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import axios from "axios";
import { ICommentsEntity } from "../../models/IComment";

export const postCommentsThunk = createAsyncThunk(
  "post/postCommentsThunk",
  async (postId: string | number, { getState }) => {
    const state = getState() as RootState;

    if (state.comments.loadedCommentsPostIds.includes(postId)) return;

    const response = (await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    )) as any;

    let entities: ICommentsEntity[] = [];
    let ids: number[] = [];

    if (response.data && response.data.length) {
      entities = response.data;
      ids = response.data.reduce((acc: number[], item: ICommentsEntity) => {
        acc.push(item.id);
        return acc;
      }, []);
    }

    return { ids, entities, postId };
  }
);
