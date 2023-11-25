import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  const navOptions = (
    <>
      <li>
        <a>Item 1</a>
      </li>

      <li>
        <a>Item 3</a>
      </li>
      {user ? (
        ""
      ) : (
        <div className="text-red-700 mt-10 lg:mt-0 navbar-end  py-5 lg:py-0 gap-3">
          <div>
            <Link to="/login" className="block lg:hidden">
              Login
            </Link>
          </div>
          <div>
            <Link to="/register" className="hidden lg:block">
              Register
            </Link>
          </div>
        </div>
      )}
    </>
  );
  return (
    <div className="max-w-[1710px] mx-auto navbar bg-black fixed z-50 bg-opacity-50 text-white ">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navOptions}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          Contest
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
            <div className="flex flex-row justify-center items-center gap-5 ">
              <div className="dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0} className=" m-1">
                  <img
                    className="w-10 h-10 rounded-full border-2 border-blue-500 p-0.5"
                    src={user?.photoURL}
                  />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <div className="text-red-700">{user?.displayName}</div>
                  <Link to="/orderedPage">Your Ordered Foods</Link>
                  <Link to="/addedFood">Your Added Page</Link>
                  <Link to="/addFood">Add a Food </Link>
                  <div>
                    <button
                      className="btn bg-[#a294cd] border-[#a294cd]"
                      onClick={handleLogOut}
                    >
                      Logout
                    </button>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-row mt-10 lg:mt-0 navbar-end  py-5 lg:py-0 gap-3">
            <>
              <div>
                <Link to="/login" className=" hidden lg:block">
                  Login
                </Link>
              </div>
              <div>
                <Link to="/register" className="hidden lg:block">
                  Register
                </Link>
              </div>
            </>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
