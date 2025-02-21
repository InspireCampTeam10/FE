import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../Layout/DefaultLayout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Profile from "../pages/profile/Profile";
import FitNews from "../pages/fitnews/FitNews";
import Signup from "../pages/signup/Signup";

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
        path: "/fitnews",
        element: <FitNews />,
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
