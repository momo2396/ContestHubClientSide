import { Link } from "react-router-dom";
import useGetData from "../../Routes/useGetData";
import { useState } from "react";
import PopularSingle from "../homeComp/popularSection/PopularSingle";

const Contests = () => {
  const [type, setType] = useState("All");
  const { data, isLoading, refetch } = useGetData("/all-contests/categories");
  const defaultClass =
    "flex items-center flex-shrink-0 px-5 py-2 border-b-4  text-gray-400";
  const selectedClass = "border-gray-700";
  const unselectedClass = "border-transparent";
  if (isLoading) return <p>,,,,</p>;
  return (
    <div className="pt-32">
      <div className="flex items-center -mx-4 space-x-2 overflow-x-auto overflow-y-hidden sm:justify-center flex-nowrap">
        <button
          onClick={() => setType("All")}
          className={`${defaultClass} ${
            type === "All" ? selectedClass : unselectedClass
          }`}
        >
          All
        </button>
        {data?.map((d) => (
          <button
            onClick={() => setType(d)}
            key={d}
            className={`${defaultClass} ${
              type === d ? selectedClass : unselectedClass
            }`}
          >
            {d}
          </button>
        ))}
      </div>
      <ContestCollection type={type}></ContestCollection>
    </div>
  );
};

export default Contests;

const ContestCollection = ({ type }) => {
  const contestData = useGetData(
    type === "All"
      ? `/all-contests`
      : `/all-contests/single-category-contest?contestType=${type}`
  );
  if (contestData?.isLoading)
    return <progress className="progress w-56"></progress>;
  return (
    <>
      <div className="pt-20 max-w-[1700px] mx-auto px-5 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5">
        {contestData?.data?.map((c) => (
          <PopularSingle key={c?._id} c={c}></PopularSingle>
        ))}
      </div>
    </>
  );
};