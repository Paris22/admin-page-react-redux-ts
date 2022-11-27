export type IPostEntity = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type IPostInitialState = {
  entities: IPostEntity[];
  ids: number[];
  loading: boolean;
  postLoading: number[];
  error: null | string;
};
