import { Link } from "react-router-dom";

const PopularSingle = ({ c }) => {
  const word = c?.contestDescription.split(" ");
  const shortDescription = word.slice(0, 5).join(" ");
  return (
    <div className="flex flex-col w-full  p-6 space-y-6 overflow-hidden rounded-lg shadow-md bg-[#e9c46a] text-gray-600">
      <div className="flex  space-x-4">
        <img
          alt=""
          src={c?.contestCreatorImage}
          className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500"
        />
        <div className="flex flex-col space-y-1">
          <span className="text-sm font-semibold">
            {" "}
            Created By: {c?.contestCreatorName}
          </span>
          <span className="text-xs">
            Contact the Creator: {c?.contestCreatorMail}
          </span>
          {/* <span className="text-xs ">Posted: {c?.contestCreationDate}</span> */}
        </div>
      </div>
      <div>
        <img
          src={c?.image}
          alt=""
          className="object-cover w-full mb-4 h-36 sm:h-64 dark:bg-gray-500"
        />
        <h2 className="mb-1 text-xl font-semibold">{c?.contestName}</h2>
        <h2 className="mb-1 text-xl font-semibold">#{c?.contestType}</h2>
        <p className="text-sm ">
          {shortDescription}...{" "}
          <Link
            to={`/details/${c?._id}`}
            className="font-bold dark:text-gray-600 underline"
          >
            See More
          </Link>
        </p>
      </div>
      <div className="flex flex-wrap justify-between">
        <div className="space-x-2">
          <p className="text-sm">Participated: {c?.participatedCount}</p>
        </div>
        <div className="flex space-x-2 text-sm dark:text-gray-400">
          <button
            type="button"
            className="flex items-center p-1 space-x-1.5"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default PopularSingle;
