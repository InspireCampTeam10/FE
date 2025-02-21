import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../Layout/DefaultLayout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Profile from "../pages/profile/Profile";
import Signup from "../pages/signup/Signup";
import History from "../pages/history/History";

export const routerInfo = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/profile/*",
        element: <Profile />,
      },
      {
        path: "/history",
        element: <History />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
