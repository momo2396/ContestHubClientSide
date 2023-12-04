import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProviders";
import { backendURL } from "../../Routes/useGetData";
import { useNavigate } from "react-router-dom";
const AddContest = () => {
  const { user } = useContext(AuthContext);
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
    const winnerName = "";
    const winnerImage = "";
    const confirmed = false;
    const participatedCount = 0;
    const newContest = {
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
    fetch(backendURL + "/all-contests", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newContest),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "You created the contest!",
            icon: "success",
            confirmButtonText: "Cool",
          });
          e.target.reset();
          navigate("/dashboard/myContests");
        } else {
          Swal.fire({
            title: "Error!",
            text: "Creating failed!",
            icon: "error",
            confirmButtonText: "Close",
          });
        }
      });
  };
  return (
    <div className="px-5 py-10 flex flex-col gap-5 justify-center items-center">
      <h3 className="text-4xl font-bold font-serif text-red-800">
        Add Contest
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
              />
            </div> */}
            <div className="w-fit flex sm:flex-row flex-col gap-5 form-control mt-6">
              <input
                type="submit"
                value="Add"
                className="bg-red-800 border-white hover:bg-white hover:border-red-800 btn flex-1 text-white hover:text-red-800"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContest;
