import { useState } from "react";
import useGetData from "../../Routes/useGetData";
import Pagination from "../shared/Pagination";

const Leader = () => {
  const [page, setPage] = useState(0);
  const { data, isLoading } = useGetData("/all-contests/all-winners");
  if (isLoading)
    return (
      <progress className="max-w-[1400px] mx-auto progress w-56"></progress>
    );
  return (
    <div>
      <h2 className="text-center text-3xl my-5 ">Leader Board</h2>
      <div className="overflow-x-auto max-w-[1400px] mx-auto px-5">
        <table className="table">
          <thead className="text-center ">
            <tr>
              <th>Participant</th>
              <th>Email</th>
              <th>Won</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data?.slice(page * 10, page * 10 + 10).map((d) => (
              <tr
                key={d?._id}
                d={d}
                className={`${data[0] === 0 && "bg-yellow-500 text-white"} ${
                  data[1] === 2 && "bg-yellow-950 text-white"
                } ${data[2] === 1 && "bg-slate-500 text-white"}`}
              >
                <td>
                  <div className="mx-auto w-fit flex items-center gap-5">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={d?.user?.photoURL} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{d?.user?.userName}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="p-4 badge badge-ghost badge-sm">
                    {d?.user?.userEmail}
                  </span>
                </td>
                <td className="text-lg font-bold">{d?.won}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        length={data?.length}
      ></Pagination>
    </div>
  );
};

export default Leader;
