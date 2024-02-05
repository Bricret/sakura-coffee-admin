'use client'


import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { motion } from "framer-motion";


export default function FirstGraphic({ data } : any) {
  const chartContainer = useRef(null);

  const categorias = data.map(( item : any ) => item.categoria);
  const cantidades = data.map(( item : any ) => item.cantidad);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const chartInstance = new Chart(chartContainer.current, {
        type: 'bar', // 'bar' para gráficas de barras verticales
        data: {
          labels: categorias,
          datasets: [{
            label: 'Ventas por Categorias',
            data: cantidades,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          indexAxis: 'x', // 'x' para gráficas de barras verticales
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, []);

  return (
    <motion.article 
      className='w-full h-auto mb-6 md:m-0 md:w-8/12 md:h-96 bg-white rounded-lg p-3'
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
        <canvas  ref={chartContainer} />
    </motion.article>
  );
}
