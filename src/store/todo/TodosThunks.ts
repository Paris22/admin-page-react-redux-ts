import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITodosEntities, ITodosEntity } from "../../models/ITodo";
import { Urls } from "../../constants/urls";

export const todosThunk = createAsyncThunk("todos/todosThunk", async (_) => {
  const response = (await axios.get(Urls.TODOS_URL)) as any;

  let ids: number[] = [];
  let entities: ITodosEntities = { todo: [], done: [] };

  if (response.data && response.data.length) {
    ids = response.data.reduce((acc: number[], item: ITodosEntity) => {
      acc.push(item.id);
      return acc;
    }, []);

    const todo = response.data.filter((item: ITodosEntity) => item.completed);
    const done = response.data.filter((item: ITodosEntity) => !item.completed);

    entities = { todo, done } as unknown as ITodosEntities;
  }

  return { ids, entities };
});

export const changeTodoCompletedById = createAsyncThunk(
  "todos/changeTodoCompletedById",
  async ({
    id,
    column,
    completed,
  }: {
    id: number;
    column: "todo" | "done";
    completed: boolean;
  }) => {
    await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      completed,
    });

    return { column, id, completed };
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async ({
    userId,
    column,
    title,
  }: {
    userId: string | number;
    column: "todo" | "done";
    title: string;
  }) => {
    await axios.post(
      `https://jsonplaceholder.typicode.com/users/${userId}/todos`,
      { title, completed: column === "todo" }
    );

    return { column, title };
  }
);

export const deleteTodoById = createAsyncThunk(
  "todos/deleteTodoById",
  async ({ id, column }: { column: "todo" | "done"; id: number }) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

    return { column, id };
  }
);

export const changeTodoTitleById = createAsyncThunk(
  "todos/changeTodoTitleById",
  async ({
    id,
    column,
    title,
  }: {
    column: "todo" | "done";
    id: number;
    title: string;
  }) => {
    await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      title,
    });

    return { column, id, title };
  }
);
