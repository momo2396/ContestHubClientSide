import { useLocation } from "react-router-dom";
import useGetData, { backendURL } from "../../Routes/useGetData";
import { FaCircleQuestion } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { TiTickOutline } from "react-icons/ti";
const SubmittedTask = () => {
  const [count, setCount] = useState(0);
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
  useEffect(() => {
    let temp = 0;
    if (data) {
      data?.forEach((d) => {
        if (d?.submitted === true) temp++;
      });
    }
    setCount(temp);
  }, [isLoading]);
  if (isLoading) return <progress className="progress w-56"></progress>;
  return (
    <div className="mt-48 max-w-[98vw] bg-[#141807]">
      <div className="p-10 mx-auto text-gray-100 flex flex-col justify-center items-center">
        <div className="overflow-x-auto">
          {count > 0 && (
            <h2 className="mb-4 text-2xl font-semibold leadi text-center">
              Submitted Tasks
            </h2>
          )}
          {count > 0 ? (
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
                              <p className="flex gap-3 justify-center items-center">
                                Winner <TiTickOutline className="text-xl" />
                              </p>
                            ) : (
                              <button
                                onClick={() => handleWinner(c)}
                                className="text-xl text-white disabled:cursor-not-allowed disabled:text-gray-600"
                                disabled={select}
                              >
                                <FaCircleQuestion />
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
          ) : (
            <p>No Submissions yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmittedTask;
