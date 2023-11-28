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
import Contests from "../components/allContests/Contests";
import RoleCheck from "./RoleCheck";
import DetailsPage from "../components/detailsPageComp/DetailsPage";
import AddContest from "../components/dashboard/AddContest";
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
        path: "/contests",
        element: <Contests></Contests>,
      },
      {
        path: "/details/:id",
        element: <DetailsPage></DetailsPage>,
      },
      {
        path: "/addContest",
        element: <AddContest></AddContest>,
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
        path: "/dashboard",
        element: <p>select option </p>,
      },
      {
        path: "/dashboard/users",
        element: (
          <RoleCheck role={"admin"}>
            <Users></Users>
          </RoleCheck>
        ),
      },
      {
        path: "/dashboard/allContests",
        element: (
          <RoleCheck role={"admin"}>
            <AllContests></AllContests>
          </RoleCheck>
        ),
      },
    ],
  },
]);
