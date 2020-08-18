import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { options } from "../Chart/data-chart";

const TotalVisitor = () => {
  const dataVisitor = useSelector(state => state.dashboard.visitor)
  let label = []
  let valueTotalVisitor = []
  for (let [key, value] of Object.entries(dataVisitor)) {
    label.push(key);
    valueTotalVisitor.push(value);
  }

  let chartVisitor = {
    options: options,
    data: () => {
      return {
        labels: label,
        datasets: [
          {
            label: "Performance",
            data: valueTotalVisitor,
          },
        ],
      };
    },
  };
  return <Line data={chartVisitor.data} options={chartVisitor.options} />
}

export default TotalVisitor;
