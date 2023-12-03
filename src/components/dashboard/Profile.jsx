import { useContext } from "react";
import useGetData, { backendURL } from "../../Routes/useGetData";
import MyPieChart from "./MyPieChart";
import { AuthContext } from "../../providers/AuthProviders";
import Swal from "sweetalert2";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { data, isLoading, refetch } = useGetData(
    "/all-users/" + user?.userEmail
  );
  const handleEdit = (e) => {
    e.preventDefault();
    const form = e.target;
    const userName = form.name.value;
    const userEmail = form.email.value;
    const photoURL = form.image.value;
    const updated = {
      userName,
      userEmail,
      photoURL,
    };
    fetch(backendURL + "/all-users/" + data?._id, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updated),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "You updated the contest!",
            icon: "success",
            confirmButtonText: "Cool",
          });
          refetch();
        } else {
          Swal.fire({
            title: "Error!",
            text: "Updating failed!",
            icon: "error",
            confirmButtonText: "Close",
          });
        }
      });
  };
  if (isLoading)
    return (
      <div className=" py-36 max-w-[1400px] mx-auto px-5">
        <progress className="progress w-full"></progress>
      </div>
    );
  console.log(user);
  return (
    <div className="w-full">
      {data?.status === "user" && <MyPieChart></MyPieChart>}
      <div className="px-5 py-10 flex flex-col gap-5 justify-center items-center">
        <h3 className="text-4xl font-bold font-serif text-red-800">
          Profile Info.
        </h3>
        <div className="w-full  bg-red-800 p-3 shadow-2xl rounded-2xl">
          <div className="card w-full bg-base-100">
            <form onSubmit={handleEdit} className="card-body text-black">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  name="name"
                  defaultValue={data?.userName}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  name="email"
                  defaultValue={data?.userEmail}
                  className="input input-bordered"
                  disabled
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text"> Image</span>
                </label>
                <input
                  type="text"
                  placeholder="image"
                  name="image"
                  defaultValue={data?.photoURL}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="w-fit flex sm:flex-row flex-col gap-5 form-control mt-6">
                <input
                  type="submit"
                  value="Update"
                  className="bg-red-800 border-white hover:bg-white hover:border-red-800 btn flex-1 text-white hover:text-red-800"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
