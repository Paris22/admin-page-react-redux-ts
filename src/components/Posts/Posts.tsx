import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { postsThunk } from "../../store/post/PostThunks";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Comments } from "../Comments/Comments";
import { ExpandMore } from "../UI/MorePanel/MorePanel";
import { Loading } from "../UI/Loading/Loading";
import { Error } from "../UI/Error/Error";

export function Posts() {
  const posts = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();

  const [expandedPosts, setExpandedPosts] = useState<number[]>([]);

  useEffect(() => {
    dispatch(postsThunk());
  }, []);

  const handleExpand = (postId: number) => {
    if (expandedPosts.includes(postId)) {
      return setExpandedPosts((prev) => prev.filter((id) => id !== postId));
    }

    setExpandedPosts((prev) => prev.concat([postId]));
  };

  const loadingNotify = (() => {
    if (posts.loading) return <Loading />;
    if (posts.error) return <Error />;
    return "";
  })();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "15px",
      }}
    >
      {loadingNotify}
      {posts &&
        posts.entities.map((post) => (
          <Card
            key={post.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              maxWidth: 345,
              margin: 2,
              height: "100%",
              "&:hover": {
                transform: "scale(1.1)",
                boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.4)",
              },
            }}
          >
            <CardHeader
              title={
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {post.title}
                </Box>
              }
            />
            <Divider />
            <CardContent>{post.body}</CardContent>
            <Divider />
            <CardActions>
              <Box>
                Comments
                <ExpandMore
                  expand={expandedPosts.includes(post.id)}
                  onClick={() => handleExpand(post.id)}
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </Box>
            </CardActions>
            <Collapse in={expandedPosts.includes(post.id)} unmountOnExit>
              <Comments postId={post.id} />
            </Collapse>
          </Card>
        ))}
    </Box>
  );
}
