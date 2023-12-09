import useGetData from "../../Routes/useGetData";
import { useEffect, useState } from "react";
import PopularSingle from "../homeComp/popularSection/PopularSingle";
import Pagination from "../shared/Pagination";
import { useLocation } from "react-router-dom";

const Contests = () => {
  const location = useLocation();
  const { search } = location;
  const searchedText = search.includes("=")
    ? search.split("=").pop().toLowerCase()
    : null;

  const [type, setType] = useState(searchedText || "All");
  console.log(location, searchedText);
  const { data, isLoading } = useGetData("/all-contests/categories");
  const defaultClass =
    "flex items-center flex-shrink-0 px-5 py-2 border-b-4  text-gray-400";
  const selectedClass = "border-gray-700";
  const unselectedClass = "border-transparent";
  useEffect(() => {
    if (!search?.includes("=")) setType("All");
  }, [search]);
  if (isLoading) return <p></p>;

  return (
    <>
      <div className="pt-10">
        {searchedText ? (
          <p className="text-center text-3xl font-bold">
            You Searched for "{searchedText.toUpperCase()}"
          </p>
        ) : (
          <div className="flex items-center  overflow-x-auto overflow-y-hidden justify-center flex-wrap">
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
        )}
        <ContestCollection type={type}></ContestCollection>
      </div>
    </>
  );
};

export default Contests;

const ContestCollection = ({ type }) => {
  const [page, setPage] = useState(0);
  const contestData = useGetData(
    type.toLowerCase() === "all"
      ? `/all-contests`
      : `/all-contests/single-category-contest?contestType=${type.toLowerCase()}`
  );
  if (contestData?.isLoading)
    return <progress className="progress w-56"></progress>;
  if (contestData?.data?.length === 0)
    return <p className="text-center text-2xl font-bold">No Contests Found</p>;
  return (
    <>
      <div className="pt-20 max-w-[1700px] mx-auto px-5 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5">
        {contestData?.data
          ?.filter((f) => f?.confirmed === true)
          .slice(page * 10, page * 10 + 10)
          .map((c) => (
            <PopularSingle key={c?._id} c={c}></PopularSingle>
          ))}
      </div>
      {contestData?.data?.length && (
        <Pagination
          page={page}
          setPage={setPage}
          length={
            contestData?.data?.filter((f) => f?.confirmed === true).length
          }
        ></Pagination>
      )}
    </>
  );
};
