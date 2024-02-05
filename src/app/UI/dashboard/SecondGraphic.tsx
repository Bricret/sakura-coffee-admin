'use client'

import { Doughnut } from 'react-chartjs-2';
import { motion } from "framer-motion";


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
    <motion.article 
    className="w-full h-auto md:w-auto md:h-96 bg-white rounded-lg p-3"
    initial={{ y: "-100vh" }}
    animate={{ y: 0 }}
    transition={{ duration: 0.5 }}
    >
      <h1 className="font-semibold text-2xl pb-4 text-zinc-500">Producto mas Vendido</h1>
      <Doughnut data={data} options={options} />
    </motion.article>
  );
};

export default MyDoughnutChart;
