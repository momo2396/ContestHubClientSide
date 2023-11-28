import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "../components/homeComp/Home";
import Login from "../components/loginComp/Login";
import Register from "../components/registerComp/Register";
import PrivateRoute from "./PrivateRoute";
import Profile from "../components/Profile";
import Dashboard from "../components/dashboard/Dashboard";
import Users from "../components/dashboard/Users";
import AllContests from "../components/dashboard/AllContests";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/users",
        element: <Users></Users>,
      },
      {
        path: "/dashboard/allContests",
        element: <AllContests></AllContests>,
      },
    ],
  },
]);
