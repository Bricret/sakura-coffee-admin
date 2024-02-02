'use client'

import { Doughnut } from 'react-chartjs-2';


const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      tooltip: {
        enabled: true,
      },
    },
  };
  
const MyDoughnutChart = ({product} : any) => {

    const data = {
        labels: [product.nombre, 'Otros'],
        datasets: [
          {
            label: 'Porcentaje',
            data: [Number(product.porcentaje), (100 - Number(product.porcentaje))], // 75% ocupado, 25% restante
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)', // Color azul con opacidad
              'rgba(255, 99, 132, 0.2)' // Color transparente para la parte no ocupada
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)', // Borde azul
              'rgba(255, 99, 132, 1)' // Borde transparente
            ],
            borderWidth: 1,
            cutout: '70%' // Espesor del anillo de la dona
          },
        ],
      };

  return (
    <Doughnut data={data} options={options} />
  );
};

export default MyDoughnutChart;
