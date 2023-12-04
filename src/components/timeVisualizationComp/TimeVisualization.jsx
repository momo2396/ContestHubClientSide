import { useEffect, useState } from "react";
import useGetData from "../../Routes/useGetData";
import PopularSingle from "../homeComp/popularSection/PopularSingle";
import Pagination from "../shared/Pagination";

const TimeVisualization = () => {
  const date = new Date().getFullYear();
  const m = new Date().getMonth();
  const [mon, setMon] = useState(`${m < 10 ? "0" + (m + 1) : "" + (m + 1)}`);
  const [yr, setYr] = useState(date);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [contests, setContests] = useState([]);
  const [page, setPage] = useState(0);
  const { data, isLoading } = useGetData("/all-contests");
  useEffect(() => {
    handleMonthYear();
  }, []);
  useEffect(() => {
    let temp = [];
    if (data?.length) {
      data?.forEach((d) => {
        const timeStamp = new Date(d?.contestDeadline);
        if (timeStamp >= start && timeStamp < end) {
          temp.push(d);
        }
      });
      setContests(temp);
    }
  }, [isLoading, start]);
  const month = [
    {
      mName: "Jan",
      mNum: "01",
    },
    {
      mName: "Feb",
      mNum: "02",
    },
    {
      mName: "Mar",
      mNum: "03",
    },
    {
      mName: "Apr",
      mNum: "04",
    },
    {
      mName: "May",
      mNum: "05",
    },
    {
      mName: "Jun",
      mNum: "06",
    },
    {
      mName: "Jul",
      mNum: "07",
    },
    {
      mName: "Aug",
      mNum: "08",
    },
    {
      mName: "Sep",
      mNum: "09",
    },
    {
      mName: "Oct",
      mNum: "10",
    },
    {
      mName: "Nov",
      mNum: "11",
    },
    {
      mName: "Dec",
      mNum: "12",
    },
  ];
  const year = [date - 1, date, date + 1];
  const handleMonthYear = () => {
    setStart(new Date(yr + "-" + mon + "-" + "01").getTime());
    if (mon === "12") {
      setEnd(new Date(parseInt(yr) + 1 + "-" + "01" + "-" + "01").getTime());
    } else {
      if (parseInt(mon) + 1 < 10) {
        setEnd(
          new Date(yr + "-0" + (parseInt(mon) + 1) + "-" + "01").getTime()
        );
      } else {
        setEnd(new Date(yr + "-" + (parseInt(mon) + 1) + "-" + "01").getTime());
      }
    }
  };
  if (isLoading && !start)
    return (
      <progress className="max-w-[1400px] mx-auto progress w-56"></progress>
    );
  return (
    <div>
      <div className="flex justify-center items-center py-10">
        <div className="join">
          <select
            onChange={(e) => setMon(e.target.value)}
            defaultValue={mon}
            className="select select-bordered join-item"
          >
            {month?.map((m) => (
              <option value={m?.mNum} key={m?.mNum}>
                {m?.mName}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => setYr(e.target.value)}
            defaultValue={yr}
            className="select select-bordered join-item"
          >
            {year?.map((y) => (
              <option value={y} key={y}>
                {y}
              </option>
            ))}
          </select>
          <div className="indicator">
            <button onClick={handleMonthYear} className="btn join-item">
              Filter
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-10">
        {contests?.length > 0 &&
          contests
            ?.slice(page * 10, page * 10 + 10)
            .map((c) => <PopularSingle key={c?._id} c={c}></PopularSingle>)}
      </div>
      {contests?.length > 0 ? (
        <Pagination
          page={page}
          setPage={setPage}
          length={contests?.length}
        ></Pagination>
      ) : (
        <p className="text-center text-3xl">No contests in this month</p>
      )}
    </div>
  );
};

export default TimeVisualization;
