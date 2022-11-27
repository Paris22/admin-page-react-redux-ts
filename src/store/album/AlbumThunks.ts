import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { IAlbumEntity } from "../../models/IAlbum";
import { Urls } from "../../constants/urls";

export const albumByIdThunk = createAsyncThunk(
  "albums/albumByIdThunk",
  async (albumId: number, { getState }) => {
    const response = (await axios.get(
      `https://jsonplaceholder.typicode.com/albums/${albumId}`
    )) as any;

    const state = getState() as RootState;

    if (state.albums.ids.some((id) => id === albumId)) return;

    let id: number | null = null;
    let entity: IAlbumEntity | null = null;

    if (response.data) {
      id = response.data.id as number;
      entity = response.data as IAlbumEntity;
    }

    return { id, entity };
  }
);

export const albumsThunk = createAsyncThunk("albums/albumsThunk", async (_) => {
  const response = (await axios.get(Urls.ALBUMS_URL)) as any;

  let ids: number[] = [];
  let entities: IAlbumEntity[] = [];

  if (response.data && response.data.length) {
    ids = response.data.reduce((acc: number[], item: IAlbumEntity) => {
      acc.push(item.id);
      return acc;
    }, []);

    entities = response.data;
  }

  return { ids, entities };
});
