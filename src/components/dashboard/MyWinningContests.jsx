import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import useGetData from "../../Routes/useGetData";

const MyWinningContests = () => {
  const { user } = useContext(AuthContext);
  const { data, isLoading } = useGetData("/all-contests");
  if (isLoading)
    return (
      <div className=" py-36 max-w-[1400px] mx-auto px-5">
        <progress className="progress w-56 "></progress>
      </div>
    );
  return (
    <div className="mt-20 max-w-[98vw] bg-[#414829]">
      <div className="p-10 mx-auto dark:text-gray-100">
        <div className="overflow-x-auto">
          <table className="table table-xs w-fit">
            <thead className="text-white">
              <tr className="text-center">
                <th>Contest</th>
                <th>Category</th>
                <th>Prize</th>
              </tr>
            </thead>

            <tbody>
              {data?.map(
                (c) =>
                  c?.winnerEmail === user?.email && (
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
                          <span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900">
                            <span>{c?.contestPrize}</span>
                          </span>
                        </td>
                      </tr>
                    </>
                  )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyWinningContests;
