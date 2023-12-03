import { PureComponent, useContext } from "react";
import { PieChart, Pie } from "recharts";
import { AuthContext } from "../../providers/AuthProviders";
import useGetData from "../../Routes/useGetData";
let chartData;
export class MyPie extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/pie-chart-of-straight-angle-oz0th";

  render() {
    return (
      <div className="py-20 flex justify-center items-center">
        <PieChart width={250} height={300}>
          <Pie
            dataKey="value"
            startAngle={0}
            endAngle={360}
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill={chartData?.color}
            label
          />
        </PieChart>
      </div>
    );
  }
}
const MyPieChart = () => {
  const { user } = useContext(AuthContext);
  const { data, isLoading } = useGetData(
    "/register-contest/winning-ratio/" + user?.userEmail
  );
  const lost = (data?.attempted - data?.win) / data?.attempted;
  const winning = data?.win / data?.attempted;
  chartData = [
    { name: "Winning", value: winning * 100, color: "#8884d8" },
    { name: "Attempted", value: lost * 100, color: "#00ff00" },
  ];
  if (isLoading)
    return (
      <div className=" py-36 max-w-[1400px] mx-auto px-5">
        <progress className="progress w-56 "></progress>
      </div>
    );
  return (
    <div>
      {data?.attempted === 0 ? (
        <p className=" py-36 max-w-[1400px] mx-auto px-5 text-center text-2xl font-bold">
          Attemption 0. Participate in contests
        </p>
      ) : (
        <MyPie></MyPie>
      )}
    </div>
  );
};

export default MyPieChart;
