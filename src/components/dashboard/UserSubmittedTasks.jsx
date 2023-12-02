import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import useGetData, { backendURL } from "../../Routes/useGetData";
import { Link } from "react-router-dom";

const UserSubmittedTasks = () => {
  const { user } = useContext(AuthContext);
  const { data, isLoading } = useGetData(
    "/register-contest/particular-contests/" + user?.email
  );
  if (isLoading)
    return (
      <div className=" py-36 max-w-[1400px] mx-auto px-5">
        <progress className="progress w-56 "></progress>
      </div>
    );
  return (
    <div className="max-w-[1400px] mx-auto px-5  py-36 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {data?.map(
          (d) => d?.submitted && <Card key={d?.contest?._id} d={d}></Card>
        )}
      </div>
    </div>
  );
};

export default UserSubmittedTasks;

const Card = ({ d }) => {
  return (
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
  );
};
