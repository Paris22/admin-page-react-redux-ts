import {
  Card,
  CardHeader,
  ListItem,
  List,
  capitalize,
  IconButton,
  Input,
  Box,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  addTodo,
  changeTodoTitleById,
  deleteTodoById,
} from "../../store/todo/TodosThunks";
import { Draggable } from "react-beautiful-dnd";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import AddIcon from "@mui/icons-material/Add";

type Props = {
  completed?: boolean;
  placeholder?: ReactElement<
    HTMLElement,
    string | React.JSXElementConstructor<any>
  > | null;
  form: React.RefObject<HTMLFormElement>;
};

interface FormElements extends HTMLCollection {
  "addTodo-todo": HTMLInputElement;
  "addTodo-done": HTMLInputElement;
}

export function TodosColumn({ completed, placeholder, form }: Props) {
  const todos = useAppSelector((state) => state.todos);

  const column = completed ? "todo" : "done";

  const dispatch = useAppDispatch();

  return (
    <Card elevation={5}>
      <CardHeader
        title={
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {capitalize(column)}{" "}
            <FormControl>
              <InputLabel>Add todo</InputLabel>
              <Input
                id={`addTodo-${column}`}
                title={"Add todo"}
                sx={{ width: "190px" }}
                endAdornment={
                  <IconButton
                    onClick={() => {
                      const formElements = form.current!
                        .elements as FormElements;
                      const input = formElements[
                        `addTodo-${column}`
                      ] as HTMLInputElement;
                      if (!input.value) return;
                      dispatch(
                        addTodo({
                          userId: todos.entities[column][0].userId,
                          column,
                          title: input.value,
                        })
                      );
                      input.value = "";
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                }
              />
            </FormControl>
          </Box>
        }
      />
      <List
        dense
        sx={{
          bgcolor: "text.primary",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: 1,
        }}
      >
        <>
          {todos.entities[column].map((todo, index) => {
            return (
              <Draggable
                key={todo.id}
                draggableId={todo.id.toString()}
                index={index}
              >
                {(provided) => (
                  <ListItem
                    sx={{
                      padding: 1,
                      border: `2px solid`,
                      borderRadius: "4px",
                      bgcolor: "primary.main",
                    }}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    secondaryAction={
                      <Box {...provided.dragHandleProps}>
                        <DragIndicatorIcon sx={{ marginTop: "6px" }} />
                      </Box>
                    }
                  >
                    <Input
                      sx={{ width: "85%" }}
                      multiline
                      defaultValue={capitalize(todo.title)}
                      onBlur={(event) => {
                        const target = event.target as HTMLInputElement;
                        dispatch(
                          changeTodoTitleById({
                            id: todo.id,
                            title: target.value,
                            column,
                          })
                        );
                      }}
                      endAdornment={
                        <IconButton
                          onClick={() => {
                            dispatch(
                              deleteTodoById({
                                id: todo.id,
                                column,
                              })
                            );
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    />
                  </ListItem>
                )}
              </Draggable>
            );
          })}
          {placeholder}
        </>
      </List>
    </Card>
  );
}
