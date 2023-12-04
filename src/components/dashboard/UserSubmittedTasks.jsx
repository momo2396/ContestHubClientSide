import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import useGetData from "../../Routes/useGetData";
import { Link } from "react-router-dom";
import Pagination from "../shared/Pagination";

const UserSubmittedTasks = () => {
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const { user } = useContext(AuthContext);
  const { data, isLoading } = useGetData(
    "/register-contest/particular-contests/" + user?.userEmail
  );
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
    <>
      <div className="max-w-[1400px] mx-auto px-5  py-36 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {data
            ?.slice(page * 10, page * 10 + 10)
            .map(
              (d) => d?.submitted && <Card key={d?.contest?._id} d={d}></Card>
            )}
        </div>
      </div>
      {count > 0 ? (
        <Pagination
          page={page}
          setPage={setPage}
          length={data?.length}
        ></Pagination>
      ) : (
        <p className="text-center text-3xl font-bold">No Submissions Yet</p>
      )}
    </>
  );
};

export default UserSubmittedTasks;

const Card = ({ d }) => {
  return (
    <>
      <div className="card card-side rounded-none py-2 bg-base-100 shadow-xl">
        <figure>
          <img
            className="h-[100px] w-[100px]"
            src={d?.contest?.image}
            alt="contest"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{d?.contest?.contestName}</h2>
          <p>Your Task: {d?.submittedTask}</p>
          {d?.winner === true ? (
            <Link className="underline" to={`/details/${d?.contestId}`}>
              See Winner
            </Link>
          ) : (
            <p>Winner is not selected yet</p>
          )}
        </div>
      </div>
    </>
  );
};
