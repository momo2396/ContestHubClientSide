import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/shared/navComp/Navbar";
const Root = () => {
  const location = useLocation();
  const noHeaderFooter = location.pathname.includes("login");
  const noHeaderFooter2 = location.pathname.includes("register");
  return (
    <div>
      {noHeaderFooter || noHeaderFooter2 || <Navbar></Navbar>}
      <Outlet></Outlet>
    </div>
  );
};

export default Root;
