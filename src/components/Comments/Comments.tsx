import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  selectCommentsByPostId,
  selectCommentsModuleState,
} from "../../store/comment/CommentsSelectors";
import { postCommentsThunk } from "../../store/comment/CommentsThunks";
import {
  Card,
  Container,
  Paper,
  CardHeader,
  CardContent,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { Loading } from "../UI/Loading/Loading";
import { Error } from "../UI/Error/Error";

export function Comments({ postId }: { postId: string | number }) {
  const postComments = useAppSelector((state) =>
    selectCommentsByPostId(state, { postId })
  );
  const postCommentsState = useAppSelector((state) =>
    selectCommentsModuleState(state)
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (postComments.length) return;
    dispatch(postCommentsThunk(postId));
  }, []);

  const loadingNotify = (() => {
    if (postCommentsState.loading) return <Loading />;
    if (postCommentsState.error) return <Error />;
    return "";
  })();

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        marginBottom: "15px",
      }}
    >
      {loadingNotify}
      {!!postComments.length &&
        postComments.map((comment) => (
          <Paper key={comment.id} elevation={12}>
            <Card>
              <CardHeader
                title={
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <Typography variant="caption">{comment.email}</Typography>
                    <Divider />
                    <Typography variant="h6">{comment.name}</Typography>
                    <Divider />
                  </Box>
                }
              />
              <CardContent>{comment.body}</CardContent>
            </Card>
          </Paper>
        ))}
    </Container>
  );
}
