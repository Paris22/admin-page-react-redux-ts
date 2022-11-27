import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addTodo,
  changeTodoCompletedById,
  changeTodoTitleById,
  deleteTodoById,
  todosThunk,
} from "../todo/TodosThunks";
import { ITodosInitialState } from "../../models/ITodo";
import { errors } from "../../constants/errors";

const initialState: ITodosInitialState = {
  entities: { todo: [], done: [] },
  ids: [],
  userIdTodosFetched: [],
  loading: false,
  error: null,
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    reorderTodos(
      state,
      action: PayloadAction<{
        fromColumn: "todo" | "done";
        toColumn: "todo" | "done";
        fromIndex: number;
        toIndex: number;
      }>
    ) {
      const [reorderedItem] = state.entities[action.payload.fromColumn].splice(
        action.payload.fromIndex,
        1
      );
      state.entities[action.payload.toColumn].splice(
        action.payload.toIndex,
        0,
        reorderedItem
      );
    },
  },
  extraReducers: (builder) => {
    function sharedPendingReducer(state: ITodosInitialState) {
      state.error = null;
    }

    builder
      .addCase(changeTodoCompletedById.pending, sharedPendingReducer)
      .addCase(addTodo.pending, sharedPendingReducer)
      .addCase(deleteTodoById.pending, sharedPendingReducer)
      .addCase(changeTodoTitleById.pending, sharedPendingReducer)
      .addCase(todosThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
      });

    builder
      .addCase(changeTodoCompletedById.rejected, (state, action) => {
        state.error = action.error.message || errors.RESPONSE_ERROR;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.error = action.error.message || errors.RESPONSE_ERROR;
      })
      .addCase(deleteTodoById.rejected, (state, action) => {
        state.error = action.error.message || errors.RESPONSE_ERROR;
      })
      .addCase(changeTodoTitleById.rejected, (state, action) => {
        state.error = action.error.message || errors.RESPONSE_ERROR;
      })
      .addCase(todosThunk.rejected, (state, action) => {
        state.error = action.error.message || errors.RESPONSE_ERROR;
        state.loading = false;
      });

    builder
      .addCase(changeTodoCompletedById.fulfilled, (state, action) => {
        const todo = state.entities[action.payload.column].find(
          (todo) => todo.id === action.payload.id
        );
        if (todo) {
          todo.completed = action.payload.completed;
        }
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.entities[action.payload.column].push({
          id: state.ids.length + 1,
          userId: state.entities["todo"][0].userId,
          title: action.payload.title,
          completed: action.payload.column === "todo",
        });
        state.ids.push(state.ids.length + 1);
      })
      .addCase(todosThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        if (action.payload) {
          state.entities.todo = state.entities.done.concat(
            action.payload.entities.todo
          );
          state.entities.done = state.entities.done.concat(
            action.payload.entities.done
          );
          state.ids = state.ids.concat(action.payload.ids);
        }
      })
      .addCase(deleteTodoById.fulfilled, (state, action) => {
        state.entities[action.payload.column] = state.entities[
          action.payload.column
        ].filter((todo) => todo.id !== action.payload.id);
        state.ids = state.ids.filter((id) => id !== action.payload.id);
      })
      .addCase(changeTodoTitleById.fulfilled, (state, action) => {
        const todo = state.entities[action.payload.column].find(
          (todo) => todo.id === action.payload.id
        );
        if (todo) {
          todo.title = action.payload.title;
        }
      });
  },
});

export const { reorderTodos } = todosSlice.actions;

export const todosReducer = todosSlice.reducer;
