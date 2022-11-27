import { Container, Grid, Box } from "@mui/material";
import React, { createRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  changeTodoCompletedById,
  todosThunk,
} from "../../store/todo/TodosThunks";
import { reorderTodos } from "../../store/todo/TodosSlice";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { TodosColumn } from "../TodoColumns/TodosColumns";
import { Loading } from "../UI/Loading/Loading";
import { Error } from "../UI/Error/Error";

interface IExtendedDropResult extends DropResult {
  source: {
    droppableId: "todo" | "done";
    index: number;
  };
  destination: {
    droppableId: "todo" | "done";
    index: number;
  };
}

export function Todos() {
  const todos = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  const form = createRef<HTMLFormElement>();

  useEffect(() => {
    if (todos.ids.length) return;
    dispatch(todosThunk());
  }, []);

  const loadingNotify = (() => {
    if (todos.loading) return <Loading />;
    if (todos.error) return <Error />;
    return "";
  })();

  const onDragEnd = (data: IExtendedDropResult) => {
    const fromColumn = data.source.droppableId;
    if (data.destination) {
      const toColumn = data.destination.droppableId;

      if (fromColumn !== toColumn) {
        const completed = toColumn === "todo" ? true : false;
        dispatch(
          changeTodoCompletedById({
            id: parseInt(data.draggableId),
            completed,
            column: fromColumn,
          })
        );
      }
      dispatch(
        reorderTodos({
          fromIndex: data.source.index,
          toIndex: data.destination.index,
          fromColumn,
          toColumn,
        })
      );
    }
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Box>
        {loadingNotify}
        {todos && (
          <DragDropContext onDragEnd={onDragEnd}>
            <form ref={form}>
              <Grid container spacing={6} justifyContent="center">
                <Droppable droppableId="todo">
                  {(provided) => (
                    <Grid
                      item
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      sx={{ width: "500px" }}
                    >
                      <TodosColumn
                        form={form}
                        completed
                        placeholder={provided.placeholder}
                      />
                    </Grid>
                  )}
                </Droppable>
                <Droppable droppableId="done">
                  {(provided) => (
                    <Grid
                      item
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      sx={{ width: "500px" }}
                    >
                      <TodosColumn
                        form={form}
                        placeholder={provided.placeholder}
                      />
                    </Grid>
                  )}
                </Droppable>
              </Grid>
            </form>
          </DragDropContext>
        )}
      </Box>
    </Container>
  );
}
