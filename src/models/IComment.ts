export type ICommentsEntity = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export type ICommentsInitialState = {
  entities: ICommentsEntity[];
  ids: number[];
  loadedCommentsPostIds: Array<string | number>;
  loading: boolean;
  error: null | string;
};
