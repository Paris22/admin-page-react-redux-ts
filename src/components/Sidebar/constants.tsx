import { Paths } from "../../constants/paths";
import PhotoAlbumIcon from "@mui/icons-material/PhotoAlbum";
import ArticleIcon from "@mui/icons-material/Article";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { names } from "../../constants/names";
import React from "react";
import { Albums } from "../Albums/Albums";
import { Posts } from "../Posts/Posts";
import { Todos } from "../Todos/Todos";
import { ITab } from "../../models/ITab";

export const tabsInfo: ITab[] = [
  {
    name: names.Albums,
    path: Paths.Albums,
    icon: <PhotoAlbumIcon />,
    element: <Albums />,
  },
  {
    name: names.Posts,
    path: Paths.Posts,
    icon: <ArticleIcon />,
    element: <Posts />,
  },
  {
    name: names.Todos,
    path: Paths.Todos,
    icon: <FormatListBulletedIcon />,
    element: <Todos />,
  },
];
