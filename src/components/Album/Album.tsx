import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Typography,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  selectAlbumById,
  selectAlbumsModuleState,
} from "../../store/album/AlbumSelectors";
import { Photos } from "../Photos/Photos";
import { albumByIdThunk } from "../../store/album/AlbumThunks";
import { Loading } from "../UI/Loading/Loading";
import { Error } from "../UI/Error/Error";

export function Album() {
  const [params] = useSearchParams();
  const albumId = params.get("id");
  const album = useAppSelector((state) =>
    selectAlbumById(state, { albumId: parseInt(albumId || "1") })
  );
  const albumState = useAppSelector((state) => selectAlbumsModuleState(state));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!albumId || album) return;
    dispatch(albumByIdThunk(+albumId));
  }, []);

  const loadingNotify = (() => {
    if (albumState.loading) return <Loading />;
    if (albumState.error) return <Error />;
    return "";
  })();

  return (
    <Container sx={{ width: "850px" }}>
      {loadingNotify}
      {albumState && album && (
        <Card>
          <CardHeader
            title={
              <Box>
                <Typography variant="h6" sx={{ paddingBottom: "16px" }}>
                  Album: {album.title}
                </Typography>
              </Box>
            }
          />
          <CardContent>
            <Typography
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            />
            <Photos albumId={album.id} />
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
