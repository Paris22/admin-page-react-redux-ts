import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Layout } from "./components/Layout/Layout";
import { setupStore } from "./store";
import React from "react";
import { DashboardPage } from "./pages/DashboardPage/DashboardPage";
import { Albums } from "./components/Albums/Albums";
import { Paths } from "./constants/paths";
import { AuthPage } from "./pages/AuthPage/AuthPage";
import { Posts } from "./components/Posts/Posts";
import { Album } from "./components/Album/Album";
import { Todos } from "./components/Todos/Todos";
import { NotFound } from "./pages/NotFound/NotFound";

//Todo Доделать аутентификацию
//Todo Закинуть все строковые наименования в dictionary

const isAuth = true;

const store = setupStore();

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div>
          <Routes>
            {isAuth ? (
              <Route element={<Layout />}>
                <Route index element={<DashboardPage />} />
                <Route path={Paths.Albums} element={<Albums />} />
                <Route path={Paths.CurrentAlbum} element={<Album />} />
                <Route path={Paths.Posts} element={<Posts />} />
                <Route path={Paths.Todos} element={<Todos />} />
                <Route path="/*" element={<NotFound />} />
              </Route>
            ) : (
              <Route index element={<AuthPage />} />
            )}
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
};
