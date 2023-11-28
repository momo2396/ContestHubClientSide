import useGetData, { backendURL } from "../../Routes/useGetData";
import Swal from "sweetalert2";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const AllContests = () => {
  const { data, isLoading, refetch } = useGetData("/all-contests");
  const handleConfirm = async (c, confirmed) => {
    const res = await fetch(
      backendURL + "/all-contests/single-contest/" + c?._id,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          ...c,
          confirmed: confirmed,
        }),
      }
    );

    const resData = await res.json();
    Swal.fire(
      "Good job!",
      "Contest has been confirmed successfully!",
      "success"
    );
    refetch();
  };
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
    <div className="mt-20 max-w-[98vw] bg-[#141807]">
      <div className="p-10 mx-auto dark:text-gray-100">
        <h2 className="mb-4 text-2xl font-semibold leadi">
          Total Contests: {data?.length}
        </h2>
        <div className="overflow-x-auto">
          <table className="table table-xs w-fit">
            <thead className="text-white">
              <tr className="text-center">
                <th>Title</th>
                <th>Category</th>
                <th>Creator</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {data?.map((c) => (
                <>
                  <tr
                    className="border-b border-opacity-20 dark:border-gray-500 "
                    key={c?._id}
                  >
                    <td className="p-5 text-center">
                      <Link
                        title="See Details"
                        className="text-blue-500"
                        to={`/contestDetails/${c?._id}`}
                      >
                        {c?.contestName}
                      </Link>
                    </td>
                    <td className="p-5 text-center">
                      <p>{c?.contestType}</p>
                    </td>
                    <td className="p-5 text-center">
                      <p>{c?.contestCreatorMail}</p>
                    </td>
                    <td className="p-5 text-center flex gap-2 justify-center items-center">
                      {c?.confirmed ? (
                        <p>Confirmed</p>
                      ) : (
                        <button
                          className="btn btn-xs btn-success"
                          onClick={() => handleConfirm(c, true)}
                        >
                          Confirm
                        </button>
                      )}
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => handleDelete(c?._id)}
                      >
                        <MdOutlineDelete className="text-white text-xl" />
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

export default AllContests;
