import { PureComponent, useContext } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { AuthContext } from "../../providers/AuthProviders";
import useGetData from "../../Routes/useGetData";
let chartData;
export class MyPie extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/pie-chart-of-straight-angle-oz0th";

  render() {
    return (
      <div className="py-20 flex justify-center items-center">
        {/* <ResponsiveContainer width="60%" height="60%"> */}
        <PieChart width={500} height={500}>
          <Pie
            dataKey="value"
            startAngle={0}
            endAngle={360}
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill={chartData?.color}
            label
          />
        </PieChart>
        {/* </ResponsiveContainer> */}
      </div>
    );
  }
}
const MyPieChart = () => {
  const { user } = useContext(AuthContext);
  const { data, isLoading } = useGetData(
    "/register-contest/winning-ratio/" + user?.email
  );
  const lost = (data?.attempted - data?.win) / data?.attempted;
  const winning = data?.win / data?.attempted;
  chartData = [
    { name: "Winning", value: winning * 100, color: "#8884d8" },
    { name: "Attempted", value: lost * 100, color: "#8884d9" },
  ];
  if (isLoading)
    return (
      <div className=" py-36 max-w-[1400px] mx-auto px-5">
        <progress className="progress w-56 "></progress>
      </div>
    );
  return (
    <div>
      <MyPie></MyPie>
    </div>
  );
};

export default MyPieChart;
