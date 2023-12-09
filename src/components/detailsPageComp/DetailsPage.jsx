import { Link, useLocation, useNavigate } from "react-router-dom";
import useGetData, { backendURL } from "../../Routes/useGetData";
import { BsArrowRightShort } from "react-icons/bs";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import Swal from "sweetalert2";

const DetailsPage = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const { pathname } = location;
  const id = pathname.split("/").pop();
  const { data, isLoading } = useGetData("/all-contests/single-contest/" + id);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();
  const getTime = (endTime) => {
    const time = Date.parse(endTime) - Date.now();
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  const query = useGetData(
    "/register-contest/particular-contests/" + user?.userEmail
  );
  useEffect(() => {
    const interval = setInterval(() => {
      if (data?.contestDeadline) getTime(data?.contestDeadline);
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);

  const handleRegisterContest = async () => {
    const exist = query?.data?.find((d) => d?.contestId === id);
    if (exist) {
      Swal.fire({
        title: "Error!",
        text: "You already registered for the contest!",
        icon: "error",
        confirmButtonText: "Close",
      });
      return;
    }
    const registrationData = {
      contestId: id,
      userEmail: user?.userEmail,
      submitted: false,
    };
    const res = await fetch(backendURL + "/register-contest", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(registrationData),
    });
    const resdata = await res.json();
    Swal.fire({
      title: "Success!",
      text: "You registered for the contest!",
      icon: "success",
      confirmButtonText: "Cool",
    });

    navigate("/dashboard/myRegisteredContest");
  };

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
        {new Date(data?.contestDeadline) > new Date() &&
        user?.status === "user" &&
        !data?.winnerName ? (
          <button
            onClick={handleRegisterContest}
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
        {new Date(data?.contestDeadline) < new Date() ||
          (data?.winnerName && (
            <div className="bg-[#bc6c25] p-5 rounded-lg text-xl flex flex-col gap-3 text-white w-fit justify-center items-center">
              <img src={data?.winnerImage} className="w-12 rounded-full" />
              <p>Winner: {data?.winnerName}</p>
            </div>
            // ) : (
            //   <div>
            //     <p>
            //       Started at: {data?.contestStartingTime} UTC,{" "}
            //       {data?.contestStartingDate}
            //     </p>
            //   </div>
          ))}
      </div>
      {!data?.winnerName && (
        <div className="flex gap-5 justify-center items-center">
          <p>Registration Deadline:</p>
          <div>
            <span className="countdown font-mono text-4xl">
              <span style={{ "--value": days }}></span>
            </span>
            days
          </div>
          <div>
            <span className="countdown font-mono text-4xl">
              <span style={{ "--value": hours }}></span>
            </span>
            hours
          </div>
          <div>
            <span className="countdown font-mono text-4xl">
              <span style={{ "--value": minutes }}></span>
            </span>
            min
          </div>
          <div>
            <span className="countdown font-mono text-4xl">
              <span style={{ "--value": seconds }}></span>
            </span>
            sec
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
