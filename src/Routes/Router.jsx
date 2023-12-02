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
import UpdateContest from "../components/dashboard/UpdateContest";
import MyContests from "../components/dashboard/MyContests";
import SubmittedTask from "../components/dashboard/SubmittedTask";
import Payment from "../components/dashboard/Payment";
import MyRegisteredContest from "../components/dashboard/MyRegisteredContest";
import UserSubmittedTasks from "../components/dashboard/UserSubmittedTasks";
import MyWinningContests from "../components/dashboard/MyWinningContests";
import MyPieChart from "../components/dashboard/MyPieChart";
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
        path: "/payment/:id",
        element: <Payment></Payment>,
      },
      {
        path: "/myRegisteredContest",
        element: <MyRegisteredContest></MyRegisteredContest>,
      },
      {
        path: "/userSubmittedTasks",
        element: <UserSubmittedTasks></UserSubmittedTasks>,
      },
      {
        path: "/userWinningContests",
        element: <MyWinningContests></MyWinningContests>,
      },
      {
        path: "/pie",
        element: <MyPieChart></MyPieChart>,
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
      {
        path: "/dashboard/addContest",
        element: (
          <RoleCheck role={"creator"}>
            {" "}
            <AddContest></AddContest>
          </RoleCheck>
        ),
      },
      {
        path: "/dashboard/updateContest/:id",
        element: (
          <RoleCheck role={"creator"}>
            {" "}
            <UpdateContest></UpdateContest>
          </RoleCheck>
        ),
      },
      // {
      //   path: "/dashboard/payment",
      //   element: (
      //     <RoleCheck role={"user"}>
      //       {" "}
      //       <Payment></Payment>
      //     </RoleCheck>
      //   ),
      // },
      {
        path: "/dashboard/myContests",
        element: (
          <RoleCheck role={"creator"}>
            {" "}
            <MyContests></MyContests>
          </RoleCheck>
        ),
      },
      {
        path: "/dashboard/submittedTasks/:id",
        element: (
          <RoleCheck role={"creator"}>
            {" "}
            <SubmittedTask></SubmittedTask>
          </RoleCheck>
        ),
      },
    ],
  },
]);
