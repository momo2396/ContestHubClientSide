import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="flex justify-center items-center">
      <Link className="underline text-3xl font-bold" to="/">
        {" "}
        Home
      </Link>
    </div>
  );
};

export default Nav;
