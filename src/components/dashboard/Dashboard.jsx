import { Link, Outlet } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { BsCalendar2EventFill } from "react-icons/bs";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import useGetData from "../../Routes/useGetData";
const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  const { data, isLoading } = useGetData("/all-users/" + user?.userEmail);
  if (isLoading) return <progress className="progress w-56"></progress>;
  const adminMenu = (
    <>
      <li>
        <Link
          to="/dashboard/profile"
          className="flex items-center p-2 space-x-3 rounded-md"
        >
          <FiUsers />
          <span>Profile</span>
        </Link>
      </li>
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
    </>
  );
  const creatorMenu = (
    <>
      <li>
        <Link
          to="/dashboard/profile"
          className="flex items-center p-2 space-x-3 rounded-md"
        >
          <FiUsers />
          <span>Profile</span>
        </Link>
      </li>
      <li>
        <Link
          to="/dashboard/myContests"
          className="flex items-center p-2 space-x-3 rounded-md"
        >
          <FiUsers />
          <span> My Contests</span>
        </Link>
      </li>
      <li>
        <Link
          to="/dashboard/addContest"
          className="flex items-center p-2 space-x-3 rounded-md"
        >
          <BsCalendar2EventFill />
          <span>Add Contests</span>
        </Link>
      </li>
    </>
  );

  const userMenu = (
    <>
      <li>
        <Link
          to="/dashboard/profile"
          className="flex items-center p-2 space-x-3 rounded-md"
        >
          <FiUsers />
          <span>Profile</span>
        </Link>
      </li>
      <li>
        <Link
          to="/dashboard/myWinningContests"
          className="flex items-center p-2 space-x-3 rounded-md"
        >
          <BsCalendar2EventFill />
          <span>My Winning Contests</span>
        </Link>
      </li>
      <li>
        <Link
          to="/dashboard/myRegisteredContest"
          className="flex items-center p-2 space-x-3 rounded-md"
        >
          <BsCalendar2EventFill />
          <span>My Registered Contests</span>
        </Link>
      </li>
    </>
  );
  return (
    <div className="w-full flex flex-col">
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
            <div className="flex-1 px-2 mx-2">
              <Link
                to="/"
                className="flex items-center gap-3 font-bold normal-case text-3xl"
              >
                <p className="p-2 pl-3 text-2xl lg:text-5xl  bg-gradient-to-r to-[#b40000] from-[#540000] font-bold text-white rounded-l-2xl">
                  CH
                </p>
                <div className="bg-clip-text text-lg text-transparent bg-gradient-to-r to-[#540000] from-[#b40000]">
                  <p>Contest</p>
                  <p>Hub</p>
                </div>
              </Link>
            </div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal flex gap-10">
                {data?.status === "admin" && adminMenu}
                {data?.status === "creator" && creatorMenu}
                {data?.status === "user" && userMenu}
                <li>
                  <button
                    className="btn bg-[#a294cd] border-[#a294cd] text-white "
                    onClick={handleLogOut}
                  >
                    Logout
                  </button>
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
            <Link
              to="/"
              className="flex items-center gap-3 font-bold normal-case text-3xl"
            >
              <p className="p-2 pl-3 text-2xl lg:text-5xl  bg-gradient-to-r to-[#b40000] from-[#540000] font-bold text-white rounded-l-2xl">
                CH
              </p>
              <div className="bg-clip-text text-lg text-transparent bg-gradient-to-r to-[#540000] from-[#b40000]">
                <p>Contest</p>
                <p>Hub</p>
              </div>
            </Link>
            <div className="divider lg:divider-horizontal "></div>
            {data?.status === "admin" && adminMenu}
            {data?.status === "creator" && creatorMenu}
            {data?.status === "user" && userMenu}
            <div className="divider lg:divider-horizontal "></div>
            <li>
              <button
                className="btn bg-[#a294cd] border-[#a294cd] text-white "
                onClick={handleLogOut}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="px-1 mx-auto max-w-[1400px] w-full">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
