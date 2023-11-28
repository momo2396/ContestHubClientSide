import Swal from "sweetalert2";
import useGetData, { backendURL } from "../../Routes/useGetData";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
const Users = () => {
  const { data, isLoading, isError, refetch } = useGetData("/all-users");
  // const [contests, setContests] = useState();
  // useEffect(() => {
  //   axios
  //     .get("https://contest-platform-server-iota.vercel.app/all-users")
  //     .then((result) => {
  //       setContests(result?.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [contests]);

  const handleRoleChange = async (c, role) => {
    const res = await fetch(backendURL + "/all-users/" + c?._id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...c,
        status: role,
      }),
    });

    const resData = await res.json();
    Swal.fire("Good job!", "Role has been updated successfully!", "success");
    refetch();
  };

  console.log(data);
  if (isLoading) return <p>Loading..</p>;
  return (
    <div className="pt-20">
      <div className="bg-[#283618] p-9 mx-auto sm:p-4 dark:text-gray-100">
        <h2 className="mb-4 text-2xl font-semibold leadi">
          Total Users: {data?.length}
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead className="bg-[#606c38]">
              <tr className="text-left">
                <th className="p-3 text-center">User Name</th>
                <th className="p-3 text-center">User Email</th>
                <th className="p-3 text-center">Role</th>
                <th className="p-3 text-center">Edit</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((c) => (
                <>
                  <Modal c={c} handleRoleChange={handleRoleChange}></Modal>
                  <tr
                    className="border-b border-opacity-20 dark:border-gray-500 "
                    key={c?._id}
                  >
                    <td className="p-5 text-center">
                      <p>{c?.userName}</p>
                    </td>
                    <td className="p-5 text-center">
                      <p>{c?.userEmail}</p>
                    </td>
                    <td className="p-5 text-center">
                      <span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900">
                        <span>{c?.status}</span>
                      </span>
                    </td>
                    <td className="p-5 text-center">
                      <button
                        onClick={() =>
                          document
                            .getElementById(`${c?._id}RoleChange`)
                            .showModal()
                        }
                      >
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;

const Modal = ({ c, handleRoleChange }) => {
  const roles = ["admin", "creator", "user"];
  const [change, setChange] = useState(c?.status);
  return (
    <>
      <dialog
        id={`${c?._id}RoleChange`}
        className="modal modal-middle text-black"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Change Role</h3>
          <p className="my-5">{c?.userName}</p>
          <select
            onChange={(e) => setChange(e.target.value)}
            defaultValue={change}
            className="select select-bordered w-full max-w-xs text-black"
          >
            <option>admin</option>
            <option>creator</option>
            <option>user</option>
          </select>
          <div className="modal-action">
            <form
              method="dialog"
              className="w-full flex justify-between items-center"
            >
              <button className="btn">Close</button>
              <button
                onClick={() => handleRoleChange(c, change)}
                className="btn btn-success"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
