import { Link } from "react-router-dom";
import Nav from "../shared/loginRegisterNav/Nav";

const Register = () => {
  return (
    <div>
      <Nav></Nav>
      <section className="p-6 dark:text-gray-50 dark:bg-gray-900">
        <form
          noValidate=""
          action=""
          className="container flex flex-col mx-auto space-y-12"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-800">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium">Register With Your Info</p>
              <p className="text-xs">
                Put your registered mail and password...
              </p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="name" className="text-sm">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  required
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="email" className="text-sm">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  required
                />
              </div>
              <div className="col-span-full">
                <label htmlFor="photoURL" className="text-sm">
                  PhotoURL
                </label>
                <input
                  id="photoURL"
                  type="text"
                  placeholder="image link"
                  className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  required
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="Password" className="text-sm">
                  Password
                </label>
                <input
                  id="city"
                  type="password"
                  placeholder="password"
                  className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  required
                />
              </div>
            </div>
            <div>
              <button className="btn">Register</button>
            </div>
          </fieldset>
        </form>
        <div className="pt-10 flex justify-center items-center">
          <Link to="/login" className="btn">
            Already Have Account?{" "}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Register;
