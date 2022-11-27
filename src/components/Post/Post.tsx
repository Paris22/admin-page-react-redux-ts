export {};

// import React, { useEffect } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   CardHeader,
//   Container,
//   Divider,
//   Typography,
// } from "@mui/material";
// import { PostComments } from "../UI/PostComments";
// import { useSearchParams } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
// import {
//   selectPostById,
//   selectPostsModuleState,
// } from "../../store/post/PostSelectors";
// import { postCommentsThunk } from "../../store/comment/CommentsThunks";
// import { Loading } from "../UI/Loading";
// import { Error } from "../UI/Error";
//
// export function Post() {
//   const [params] = useSearchParams();
//   const postId = params.get("id");
//   const post = useAppSelector((state) =>
//     selectPostById(state, { postId: parseInt(postId || "1") })
//   );
//   const postState = useAppSelector((state) => selectPostsModuleState(state));
//   const dispatch = useAppDispatch();
//
//   useEffect(() => {
//     if (!postId || post) return;
//     dispatch(postCommentsThunk(postId));
//   }, []);
//
//   const loadingNotify = (() => {
//     if (postState.loading) return <Loading />;
//     if (postState.error) return <Error />;
//     return "";
//   })();
//
//   return (
//     <Container sx={{ width: "45%" }}>
//       {loadingNotify}
//       {postState && post && (
//         <Card>
//           <CardHeader
//             title={
//               <Box>
//                 <Typography variant="h5" sx={{ paddingBottom: "16px" }}>
//                   Post: {post.title}
//                 </Typography>
//                 <Divider />
//               </Box>
//             }
//           />
//           <CardContent>
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "30px",
//                 alignItems: "center",
//               }}
//             >
//               <Typography>{post.body}</Typography>
//               <Divider />
//               <Typography>Comments:</Typography>
//             </Box>
//             <PostComments postId={post.id} />
//           </CardContent>
//         </Card>
//       )}
//     </Container>
//   );
// }
