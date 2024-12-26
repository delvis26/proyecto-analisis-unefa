"use client";
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement } from 'chart.js/auto'

ChartJS.register(ArcElement)

const data = {
    labels: ["Inscripciones", "Mensualidades", "Documentos"],
    datasets: [
      {
        label: "Monto",
        data: [700, 300, 50],
        borderWidth: 1,
        backgroundColor: [
          "#CB4335",
          "#1F618D",
          "#F1C40F",
        ],
      },
    ],
  };

export default function PiePayments() {
  return (
    <div className='max-w-96 mx-auto'>
        <Pie data={data} />
    </div>
  );
}
