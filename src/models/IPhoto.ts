export type IPhotosEntity = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export type IPhotosInitialState = {
  entities: IPhotosEntity[];
  ids: number[];
  loadedPhotosAlbumIds: Array<string | number>;
  loading: boolean;
  error: null | string;
  success: boolean;
};
