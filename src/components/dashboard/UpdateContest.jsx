import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProviders";
import useGetData, { backendURL } from "../../Routes/useGetData";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateContest = () => {
  const location = useLocation();
  const { pathname } = location;
  const id = pathname.split("/").pop();
  console.log(id);
  const { user } = useContext(AuthContext);
  const contestData = useGetData("/all-contests/single-contest/" + id);
  const navigate = useNavigate();
  const handleAdd = (e) => {
    e.preventDefault();
    const form = e.target;
    const contestName = form.contestName.value;
    const contestType = form.contestType.value;
    const image = form.image.value;
    const contestCreatorName = form.contestCreatorName.value;
    const contestCreatorMail = form.contestCreatorMail.value;
    const contestCreatorImage = form.contestCreatorImage.value;
    const contestPrize = form.contestPrize.value;

    const contestDescription = form.contestDescription.value;
    const contestDeadline = form.contestDeadline.value;
    const taskSubmissionInstruction = form.contestDescription.value;
    const winnerName = contestData?.winnerName;
    const winnerImage = contestData?.winnerImage;
    const confirmed = contestData?.confirmed;
    const participatedCount = contestData?.participatedCount;
    const updated = {
      contestName,
      contestType,
      image,
      contestCreatorName,
      contestCreatorMail,
      contestCreatorImage,
      contestPrize,

      contestDescription,
      contestDeadline,
      taskSubmissionInstruction,
      winnerName,
      winnerImage,
      confirmed,
      participatedCount,
    };
    fetch(backendURL + "/all-contests/single-contest/" + id, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updated),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "You updated the contest!",
            icon: "success",
            confirmButtonText: "Cool",
          });
          navigate("/dashboard/myContests");
        } else {
          Swal.fire({
            title: "Error!",
            text: "Updating failed!",
            icon: "error",
            confirmButtonText: "Close",
          });
        }
      });
  };
  if (contestData?.isLoading)
    return <progress className="progress w-56"></progress>;
  return (
    <div className="px-5 py-10 flex flex-col gap-5 justify-center items-center">
      <h3 className="text-4xl font-bold font-serif text-red-800">
        Update Contest
      </h3>
      <div className="w-full  bg-red-800 p-3 shadow-2xl rounded-2xl">
        <div className="card w-full bg-base-100">
          <form onSubmit={handleAdd} className="card-body text-black">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="add title"
                name="contestName"
                className="input input-bordered"
                defaultValue={contestData?.data?.contestName}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Creator Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                name="contestCreatorName"
                defaultValue={user?.userName}
                className="input input-bordered"
                readOnly
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Creator Email</span>
              </label>
              <input
                type="text"
                placeholder="name"
                name="contestCreatorMail"
                defaultValue={user?.userEmail}
                className="input input-bordered"
                readOnly
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Creator Image</span>
              </label>
              <input
                type="text"
                placeholder="creator image"
                name="contestCreatorImage"
                defaultValue={user?.photoURL}
                className="input input-bordered"
                readOnly
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                type="text"
                name="contestType"
                className="select input input-bordered"
                defaultValue={contestData?.data?.contestType}
              >
                <option value="Business">Business</option>
                <option value="ArticleWriting">Article Writing</option>
                <option value="Gaming">Gaming</option>
                <option value="Medical">Medical</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <input
                type="text"
                placeholder="image link"
                className="input input-bordered"
                name="image"
                required
                defaultValue={contestData?.data?.image}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Winning Prize</span>
              </label>
              <input
                type="text"
                placeholder="(in dollar)"
                className="input input-bordered"
                name="contestPrize"
                required
                defaultValue={contestData?.data?.contestPrize}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                placeholder="description"
                name="contestDescription"
                className="textarea textarea-bordered"
                required
                defaultValue={contestData?.data?.contestDescription}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Instruction</span>
              </label>
              <textarea
                placeholder="submission instruction"
                name="taskSubmissionInstruction"
                className="textarea textarea-bordered"
                required
                defaultValue={contestData?.data?.taskSubmissionInstruction}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Registration Deadline</span>
              </label>
              <input
                type="date"
                placeholder="(in dollar)"
                className="input input-bordered"
                name="contestDeadline"
                required
                defaultValue={contestData?.data?.contestDeadline}
              />
            </div>
            {/* <div className="form-control">
              <label className="label">
                <span className="label-text">Starting Date</span>
              </label>
              <input
                type="date"
                placeholder="(in dollar)"
                className="input input-bordered"
                name="contestStartingDate"
                required
                defaultValue={contestData?.data?.contestStartingDate}
              />
            </div> */}
            {/* <div className="form-control">
              <label className="label">
                <span className="label-text">Starting Time</span>
              </label>
              <input
                type="time"
                placeholder="add time"
                className="input input-bordered"
                name="contestStartingTime"
                required
                defaultValue={contestData?.data?.contestStartingTime}
              />
            </div> */}
            <div className="w-fit flex sm:flex-row flex-col gap-5 form-control mt-6">
              <input
                type="submit"
                value="Update"
                className="bg-red-800 border-white hover:bg-white hover:border-red-800 btn flex-1 text-white hover:text-red-800"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateContest;
