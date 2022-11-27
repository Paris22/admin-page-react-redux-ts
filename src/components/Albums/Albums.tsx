import React, { useEffect } from "react";
import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { albumsThunk } from "../../store/album/AlbumThunks";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Loading } from "../UI/Loading/Loading";
import { Error } from "../UI/Error/Error";

export const Albums = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector((state) => state.albums);

  const navigate = useNavigate();

  useEffect(() => {
    if (albums.ids.length) return;
    dispatch(albumsThunk());
  }, []);

  const loadingNotify = (() => {
    if (albums.loading) return <Loading />;
    if (albums.error) return <Error />;
    return "";
  })();

  return (
    <div>
      {loadingNotify}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {albums &&
          albums.entities.map((album, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Card
                key={album.id}
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
                <CardHeader sx={{ paddingBottom: "5px" }} title={album.title} />
                <CardContent>
                  <Button onClick={() => navigate(`/album?id=${album.id}`)}>
                    View Album
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
      <Outlet />
    </div>
  );
};
