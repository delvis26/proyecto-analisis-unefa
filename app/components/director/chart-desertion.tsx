"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js/auto";

ChartJS.register(ArcElement);

const data = {
  labels: ["Comunidad estudiantil", "Deserción"],
  datasets: [
    {
      label: "",
      data: [150, 20],
      borderWidth: 1,
      backgroundColor: ["#1F618D", "#CB4335"],
    },
  ],
};

export default function ChartDesertion() {
  return (
    <div className="max-w-96 mx-auto">
      <Doughnut data={data} />
    </div>
  );
}
