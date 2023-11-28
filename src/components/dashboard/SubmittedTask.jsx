import { useLocation } from "react-router-dom";
import useGetData, { backendURL } from "../../Routes/useGetData";
import { FaRegEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const SubmittedTask = () => {
  const location = useLocation();
  const { pathname } = location;
  const id = pathname.split("/").pop();
  const [select, setSelect] = useState(false);
  const { data, isLoading, refetch } = useGetData(
    "/register-contest/single-contest-submissions/" + id
  );
  useEffect(() => {
    if (data) {
      data.forEach((d) => {
        if (d?.winner) setSelect(true);
      });
    }
  }, [isLoading]);
  const handleWinner = async (d) => {
    const res = await fetch(
      `${backendURL}/register-contest/set-winner/${d?._id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(d),
      }
    );
    const resData = await res.json();
    Swal.fire({
      title: "Success!",
      text: "You updated winner!",
      icon: "success",
      confirmButtonText: "Cool",
    });
    refetch();
  };
  if (isLoading) return <progress className="progress w-56"></progress>;
  return (
    <div className="mt-48 max-w-[98vw] bg-[#141807]">
      <div className="p-10 mx-auto dark:text-gray-100">
        <h2 className="mb-4 text-2xl font-semibold leadi">Submitted Tasks</h2>
        <div className="overflow-x-auto">
          <table className="table table-xs w-fit">
            <thead className="text-white">
              <tr className="text-center">
                <th>Participant Mail</th>
                <th>Task</th>
                <th>Submission Time</th>
                <th>Select Winner</th>
              </tr>
            </thead>

            <tbody>
              {data?.map((c) => {
                if (c?.submitted) {
                  return (
                    <>
                      <tr
                        className="border-b border-opacity-20 dark:border-gray-500 "
                        key={c?._id}
                      >
                        <td className="p-5 text-center">
                          <p>{c?.userEmail}</p>
                        </td>
                        <td className="p-5 text-center">
                          <p>{c?.submittedTask}</p>
                        </td>
                        <td className="p-5 text-center">
                          <p>{c?.submittedDate}</p>
                        </td>
                        <td className="p-5 text-center ">
                          {c?.winner ? (
                            <p>Winner</p>
                          ) : (
                            <button
                              onClick={() => handleWinner(c)}
                              className="text-xl text-white disabled:cursor-not-allowed disabled:text-gray-600"
                              disabled={select}
                            >
                              <FaRegEye />
                            </button>
                          )}
                        </td>
                      </tr>
                    </>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubmittedTask;
