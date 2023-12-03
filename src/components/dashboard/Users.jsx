import Swal from "sweetalert2";
import useGetData, { backendURL } from "../../Routes/useGetData";
import { FaEdit } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import Pagination from "../shared/Pagination";
const Users = () => {
  const [page, setPage] = useState(0);
  const { user } = useContext(AuthContext);
  const { data, isLoading, refetch } = useGetData("/all-users");
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

  if (isLoading) return <progress className="progress w-56"></progress>;
  return (
    <>
      <div className="mt-20 max-w-[98vw] bg-[#606c38]">
        <div className="p-10 mx-auto dark:text-gray-100 flex flex-col justify-center items-center">
          <h2 className="mb-4 text-2xl font-semibold leadi">
            Total Users: {data?.length}
          </h2>
          <div className="overflow-x-auto">
            <table className="table table-xs w-fit">
              <thead className="text-white">
                <tr className="text-center">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Edit</th>
                </tr>
              </thead>

              <tbody>
                {data?.slice(page * 10, page * 10 + 10).map((c) => (
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
                        {user?.email !== c?.userEmail && (
                          <button
                            onClick={() =>
                              document
                                .getElementById(`${c?._id}RoleChange`)
                                .showModal()
                            }
                          >
                            <FaEdit />
                          </button>
                        )}
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        length={data?.length}
      ></Pagination>
    </>
  );
};

export default Users;

const Modal = ({ c, handleRoleChange }) => {
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
