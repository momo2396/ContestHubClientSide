import { useLocation } from "react-router-dom";
import useGetData from "../../Routes/useGetData";
import { BsArrowRightShort } from "react-icons/bs";
import React, { useEffect, useState } from "react";

const DetailsPage = () => {
  const location = useLocation();
  const { pathname } = location;
  const id = pathname.split("/").pop();
  console.log(id);
  const { data, isLoading } = useGetData("/all-contests/single-contest/" + id);

  const calculateTimeRemaining = () => {
    const now = new Date().getTime();
    const target = new Date(data?.contestDeadline).getTime();
    const timeDifference = target - now;
    if (timeDifference <= 0) {
      clearInterval(intervalRef.current);
      setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    } else {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      setTime({ days, hours, minutes, seconds });
    }
  };
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const intervalRef = React.useRef();
  useEffect(() => {
    calculateTimeRemaining();
    intervalRef.current = setInterval(calculateTimeRemaining, 1000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [time]);

  if (isLoading) return <progress className="progress w-56"></progress>;
  return (
    <div className="max-w-[1700px]  font-bold mx-auto px-5 py-40 flex flex-col gap-5">
      <div className="text-lg text-white relative flex flex-row gap-5 justify-center items-end">
        <div className="flex flex-col gap-3  bg-[#bc6c25] rounded-lg p-5">
          <p>Category: #{data?.contestType}</p>
          <p>
            {" "}
            Participated: {data?.participatedCount}{" "}
            {data?.participatedCount <= 1 ? "person" : "people"}
          </p>
          <p>Contest Created: {data?.contestCreationDate}</p>
          <img className="w-[700px]" src={data?.image} alt="" />
          <div className="flex flex-col lg:flex-row gap-5 items-start">
            <img
              className="w-11 rounded-full"
              src={data?.contestCreatorImage}
              alt=""
            />
            <p>Contest Creator: {data?.contestCreatorName}</p>
          </div>
          <p>Contact Him: {data?.contestCreatorMail}</p>
        </div>
        <div className="absolute -bottom-3 -right-3 lg:-right-7 w-fit h-fit flex flex-col gap-2 bg-[#bc6c25]  rounded-lg px-2 py-3 text-center">
          <p>Food: {data?.contestName}</p>
          <p>Winning Prize: {data?.contestPrize}</p>
        </div>
      </div>
      <div className="pt-10 text-xl flex flex-col gap-3">
        <p>About Contest: {data?.contestDescription}</p>
        <p>Instruction: {data?.taskSubmissionInstruction}</p>
      </div>
      <div className="flex justify-end items-end">
        {new Date(data?.contestDeadline) > new Date() ? (
          <button
            className={`bg-red-600 text-white p-4 btn hover:text-red-600 hover:bg-white`}
          >
            {" "}
            Register Now <BsArrowRightShort className="text-xl" />
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="flex justify-center items-center">
        {new Date(data?.contestDeadline) < new Date() ? (
          <div className="bg-[#bc6c25] p-5 rounded-lg text-xl flex flex-col gap-3 text-white w-fit justify-center items-center">
            <img src={data?.winnerImage} className="w-12 rounded-full" />
            <p>Winner: {data?.winnerName}</p>
          </div>
        ) : (
          <div>
            <p>
              Started at: {data?.contestStartingTime} UTC,{" "}
              {data?.contestStartingDate}
            </p>
          </div>
        )}
      </div>
      <div className="flex gap-5 justify-center items-center">
        <p>Registration Deadline:</p>
        <div>
          <span className="countdown font-mono text-4xl">
            <span style={{ "--value": time?.days }}></span>
          </span>
          days
        </div>
        <div>
          <span className="countdown font-mono text-4xl">
            <span style={{ "--value": time?.hours }}></span>
          </span>
          hours
        </div>
        <div>
          <span className="countdown font-mono text-4xl">
            <span style={{ "--value": time.minutes }}></span>
          </span>
          min
        </div>
        <div>
          <span className="countdown font-mono text-4xl">
            <span style={{ "--value": time?.seconds }}></span>
          </span>
          sec
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
