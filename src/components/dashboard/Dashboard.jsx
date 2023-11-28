import { Link, Outlet } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { BsCalendar2EventFill } from "react-icons/bs";
const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar bg-base-300">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 px-2 mx-2">Dashboard</div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                <li>
                  <a>Nav</a>
                </li>
                <li>
                  <a>Navbar Item 2</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="drawer-side z-50">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu p-4 w-80 min-h-full bg-base-200">
            {/* Sidebar content here */}
            <p>DashBoard</p>
            <div className="divider lg:divider-horizontal "></div>
            <li>
              <Link
                to="/dashboard/users"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <FiUsers />
                <span> Users</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/allContests"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <BsCalendar2EventFill />
                <span>All Contests</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="px-1 flex-1 mx-w-[1300px] mx-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
