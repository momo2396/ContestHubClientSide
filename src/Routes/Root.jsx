import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/navComp/Navbar";
import Footer from "../components/shared/footerComp/Footer";
const Root = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
