export type IAlbumEntity = {
  userId: number;
  id: number;
  title: string;
};

export type IAlbumInitialState = {
  entities: IAlbumEntity[];
  albumLoading: number[];
  ids: number[];
  loading: boolean;
  error: null | string;
};
