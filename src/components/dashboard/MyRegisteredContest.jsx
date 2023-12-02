import axios from "axios";
import { useContext, useEffect, useState } from "react";
import useGetData, { backendURL } from "../../Routes/useGetData";
import { AuthContext } from "../../providers/AuthProviders";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const toast = () => {
  Swal.fire("Your Task Submission Date has been Expired!");
};
const MyRegisteredContest = () => {
  const { user } = useContext(AuthContext);
  const { data, isLoading, refetch } = useGetData(
    "/register-contest/particular-contests/" + user?.email
  );

  const handleSubmitTask = async (id, task) => {
    const res = await fetch(backendURL + "/register-contest", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userEmail: user?.email,
        contestId: id,
        submitted: true,
        submittedTask: task,
        submittedDate: new Date(),
      }),
    });
    const resData = await res.json();
    Swal.fire("Good job!", "Role has been updated successfully!", "success");
    refetch();
  };

  if (isLoading)
    return (
      <div className=" py-36 max-w-[1400px] mx-auto px-5">
        <progress className="progress w-56 "></progress>
      </div>
    );
  return (
    <div className="max-w-[1400px] mx-auto px-5  py-36 pb-10">
      <h2 className="text-2xl">Upcoming Contests</h2>
      <div className="flex flex-col gap-5">
        {data?.map(
          (d) =>
            !d?.submitted && (
              <Card
                key={d?.contest?._id}
                d={d}
                handleSubmitTask={handleSubmitTask}
              ></Card>
            )
        )}
        <div className="pt-10">
          <Link to="/userSubmittedTasks" className="underline text-blue-950">
            Your Submitted Tasks
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyRegisteredContest;

const Card = ({ d, handleSubmitTask }) => {
  return (
    <div className="card card-side rounded-none py-2 bg-base-100 shadow-xl">
      <figure>
        <img
          className="sm:h-[300px] sm:w-[200px]"
          src={d?.contest?.image}
          alt="Movie"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{d?.contest?.contestName}</h2>
        <p>{d?.contest?.taskSubmissionInstruction}</p>
        <p>Deadline: {d?.contest?.contestDeadline}</p>
        <p>
          Task must be submitted within 23.59 UTC at{" "}
          {d?.contest?.contestDeadline}
        </p>
        <div className="card-actions justify-end">
          <Modal d={d} handleSubmitTask={handleSubmitTask}></Modal>
          {new Date(d?.contest?.contestDeadline).getTime() >
          new Date().getTime() ? (
            <button
              onClick={() =>
                document.getElementById(`${d?.contest?._id}Submit`).showModal()
              }
              className="btn"
            >
              Submit
            </button>
          ) : (
            <button onClick={toast} className="btn btn-outline">
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Modal = ({ d, handleSubmitTask }) => {
  const [task, setTask] = useState();
  return (
    <>
      <dialog
        id={`${d?.contest?._id}Submit`}
        className="modal modal-backdrop text-black"
      >
        <div className="modal-box">
          <h3 className="pb-5 font-bold text-lg">Submit Task</h3>
          <textarea
            onChange={(e) => setTask(e.target.value)}
            placeholder="your task"
            className="textarea textarea-bordered textarea-lg w-full max-w-xs"
          ></textarea>
          <div className="modal-action">
            <form
              method="dialog"
              className="w-full flex justify-between items-center"
            >
              <button className="btn">Close</button>
              <button
                onClick={() => handleSubmitTask(d?.contest?._id, task)}
                className="btn btn-outline btn-success"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
