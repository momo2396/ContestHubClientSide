import { Link } from "react-router-dom";
import Nav from "../shared/loginRegisterNav/Nav";
import { useContext } from "react";
// import { AuthContext } from "../../providers/AuthProviders";
import { AuthContext } from "../../providers/AuthProviders";
import Swal from "sweetalert2";

// import { SiGmail } from "react-icons/si";
const Login = () => {
  const { signIn } = useContext(AuthContext);
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password).then((result) => {
      const user = result.user;
      console.log(user);
      Swal.fire("Logged In!", "You logged in successfully!", "success");
    });
  };
  return (
    <div>
      <Nav></Nav>
      <section className="container mx-auto p-10 dark:text-gray-50 dark:bg-gray-900">
        <form
          onSubmit={handleLogin}
          noValidate=""
          action=""
          className="container flex flex-col mx-auto space-y-12"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-800">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium">Login With Your Info</p>
              <p className="text-xs">
                Put your registered mail and password...
              </p>
            </div>
            <div className=" col-span-full ">
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="email" className="text-sm">
                  Email
                </label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  required
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="Password" className="text-sm">
                  Password
                </label>
                <input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  required
                />
              </div>
            </div>
            <div>
              <button className="btn">Login</button>
            </div>
          </fieldset>
        </form>
        <div className="pt-10 flex justify-center items-center gap-5">
          <div>
            <button className="btn">Login With Gmail</button>
          </div>
          <Link to="/register" className="btn">
            New User?{" "}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Login;
