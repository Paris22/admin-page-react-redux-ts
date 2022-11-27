import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Container } from "@mui/material";
import {
  selectPhotosByAlbumId,
  selectPhotosModuleState,
} from "../../store/photo/PhotosSelectors";
import { albumPhotosThunk } from "../../store/photo/PhotosThunks";
import { Loading } from "../UI/Loading/Loading";
import { Error } from "../UI/Error/Error";
import { Carousel } from "../UI/Carousel/Carousel";

export function Photos({ albumId }: { albumId: number }) {
  const albumPhotos = useAppSelector((state) =>
    selectPhotosByAlbumId(state, { albumId })
  );
  const albumPhotosState = useAppSelector((state) =>
    selectPhotosModuleState(state)
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (albumPhotos.length) return;
    dispatch(albumPhotosThunk(albumId));
  }, []);

  const loadingNotify = (() => {
    if (albumPhotosState.loading) return <Loading />;
    if (albumPhotosState.error) return <Error />;
    return "";
  })();

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {loadingNotify}
      {!!albumPhotos.length && <Carousel images={albumPhotos} />}
    </Container>
  );
}
