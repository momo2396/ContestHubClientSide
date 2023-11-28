import { Link, useNavigate } from "react-router-dom";
import Nav from "../shared/loginRegisterNav/Nav";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import Swal from "sweetalert2";
import { postUser } from "../../providers/postUser";
const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { createUser, updateUserProfile, logOut } = useContext(AuthContext);
  const onSubmit = (data) => {
    createUser(data?.email, data?.password).then(async (result) => {
      await postUser({
        userEmail: data?.email,
        userName: data?.displayName,
        photoURL: data?.photoURL,
        status: "user",
      });
      const loggedUser = result?.user;
      console.log(loggedUser);
      updateUserProfile(data?.name, data?.photoURL)
        .then(async () => {
          reset();
          Swal.fire({
            title: "Successfully Registered",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });

          logOut().then(() => {
            navigate("/login");
          });
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: "Unsuccessful",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
        });
    });
  };
  return (
    <div>
      <Nav></Nav>
      <section className="p-6 dark:text-gray-50 dark:bg-gray-900">
        <form
          onSubmit={handleSubmit(onSubmit)}
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
                  {...register("name", { required: true })}
                  placeholder="Name"
                  className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  type="text"
                />
                {errors.name && (
                  <span className="text-red-700">This field is required</span>
                )}
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="email" className="text-sm">
                  Email
                </label>
                <input
                  {...register("email", { required: true })}
                  placeholder="Email"
                  className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  type="email"
                />
                {errors.email && (
                  <span className="text-red-700">This field is required</span>
                )}
              </div>
              <div className="col-span-full">
                <label htmlFor="photoURL" className="text-sm">
                  PhotoURL
                </label>
                <input
                  {...register("photoURL", { required: true })}
                  placeholder="Image Link"
                  className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  type="text"
                />
                {errors.photoURL && (
                  <span className="text-red-700">This field is required</span>
                )}
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="Password" className="text-sm">
                  Password
                </label>
                <input
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern:
                      /^(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Z\d#$@!%&*?]/,
                  })}
                  className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  placeholder="Password"
                  type="password"
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-700">This field is required</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-700">Minimum 6 length</span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-700">
                    Minimum One Special Character, One Capital Letter, One Digit
                  </span>
                )}
              </div>
            </div>
            <div>
              <input className="btn" type="submit" value="Register" />
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
