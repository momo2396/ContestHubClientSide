import { MdOutlineDelete } from "react-icons/md";
import useGetData, { backendURL } from "../../Routes/useGetData";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaRegEye } from "react-icons/fa";
import Pagination from "../shared/Pagination";
import { set } from "react-hook-form";
const MyContests = () => {
  const [page, setPage] = useState(0);
  const { user } = useContext(AuthContext);
  const { data, isLoading, refetch } = useGetData(
    "/all-contests/my-created-contests/" + user?.userEmail
  );
  const handleDelete = async (id) => {
    const res = await fetch(backendURL + "/all-contests/single-contest/" + id, {
      method: "DELETE",
    });
    const resData = await res.json();
    Swal.fire("Good job!", "Contest has been deleted successfully!", "success");
    refetch();
  };
  if (isLoading) return <progress className="progress w-56"></progress>;
  return (
    <>
      <div className="mt-32 max-w-[98vw] bg-[#141807]">
        <div className="p-10 mx-auto dark:text-gray-100 flex flex-col justify-center items-center">
          <h2 className="mb-4 text-2xl font-semibold leadi">
            Total Created Contests: {data?.length}
          </h2>
          <div className="overflow-x-auto">
            <table className="table table-xs w-fit">
              <thead className="text-white">
                <tr className="text-center">
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Actions</th>
                  <th>Submissions</th>
                </tr>
              </thead>

              <tbody>
                {data?.slice(page * 10, page * 10 + 10).map((c) => (
                  <>
                    <tr
                      className="border-b border-opacity-20 dark:border-gray-500 "
                      key={c?._id}
                    >
                      <td className="p-5 text-center">
                        <Link
                          title="See Details"
                          className="text-blue-500"
                          to={`/details/${c?._id}`}
                        >
                          {c?.contestName}
                        </Link>
                      </td>
                      <td className="p-5 text-center">
                        <p>{c?.contestType}</p>
                      </td>
                      <td className="p-5 text-center">
                        {c?.confirmed ? <p>Confirmed</p> : <p>Pending</p>}
                      </td>
                      <td className="p-5 text-center flex gap-2 justify-center items-center">
                        {c?.confirmed ? (
                          <></>
                        ) : (
                          <div className="flex gap-2 justify-center items-center">
                            <Link to={`/dashboard/updateContest/${c?._id}`}>
                              {" "}
                              <button className="btn btn-xs btn-success">
                                Update
                              </button>
                            </Link>
                            <button
                              className="btn btn-xs btn-error"
                              onClick={() => handleDelete(c?._id)}
                            >
                              <MdOutlineDelete className="text-white text-xl" />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="p-5 text-center ">
                        <Link to={`/dashboard/submittedTasks/${c?._id}`}>
                          <FaRegEye className="  text-xl" />
                        </Link>
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

export default MyContests;
