import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import useGetData from "../../Routes/useGetData";

const MyWinningContests = () => {
  const { user } = useContext(AuthContext);
  const [count, setCount] = useState(0);
  const { data, isLoading } = useGetData("/all-contests");
  useEffect(() => {
    let temp = 0;
    if (data) {
      data?.forEach((d) => {
        if (d?.winnerEmail === user?.userEmail) temp++;
      });
    }
    setCount(temp);
  }, [isLoading]);
  if (isLoading)
    return (
      <div className=" py-36 max-w-[1400px] mx-auto px-5">
        <progress className="progress w-56 "></progress>
      </div>
    );

  return (
    <div className="mt-20 max-w-[98vw]">
      <div className="p-10 mx-auto text-black-100">
        <div className="overflow-x-auto">
          {count > 0 ? (
            <table className="table table-xs w-fit text-black">
              <thead className="text-black">
                <tr className="text-center">
                  <th>Contest</th>
                  <th>Category</th>
                  <th>Prize</th>
                </tr>
              </thead>

              <tbody>
                {data?.map(
                  (c) =>
                    c?.winnerEmail === user?.userEmail && (
                      <>
                        <tr
                          className="border-b border-opacity-20 dark:border-gray-500 "
                          key={c?._id}
                        >
                          <td className="p-5 text-center">
                            <p>{c?.contestName}</p>
                          </td>
                          <td className="p-5 text-center">
                            <p>{c?.contestType}</p>
                          </td>
                          <td className="p-5 text-center">
                            <span className="px-3 py-1 font-semibold rounded-md bg-violet-400 text-gray-900">
                              <span>{c?.contestPrize}</span>
                            </span>
                          </td>
                        </tr>
                      </>
                    )
                )}
              </tbody>
            </table>
          ) : (
            <p className="text-black text-2xl">No Winning</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyWinningContests;
