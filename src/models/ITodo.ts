export type ITodosEntity = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};

export type ITodosEntities = {
  todo: ITodosEntity[];
  done: ITodosEntity[];
};

export type ITodosInitialState = {
  entities: ITodosEntities;
  ids: number[];
  userIdTodosFetched?: number[];
  loading: boolean;
  error: null | string;
};
