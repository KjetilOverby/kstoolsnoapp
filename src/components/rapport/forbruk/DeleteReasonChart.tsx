/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ChartDataLabels);

const BarChart = ({ deleteReasonCount }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Destroy existing chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Check if deleteReasonCount is not null or undefined
    if (deleteReasonCount) {
      // Transform deleteReasonCount into an object
      const deleteReasonCountObj = deleteReasonCount.reduce(
        (acc, { deleteReason, _count }) => {
          acc[deleteReason] = _count;
          return acc;
        },
        {},
      );

      // Sort deleteReasonCount and take the top three
      const sortedDeleteReasonCount = Object.entries(deleteReasonCountObj)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});

      // Create a new chart instance
      const ctx = chartRef.current.getContext("2d");
      const labels = Object.keys(sortedDeleteReasonCount);
      const data = Object.values(sortedDeleteReasonCount);

      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Antall",
              data: data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(255, 205, 86, 0.6)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(255, 205, 86, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            datalabels: {
              color: "#000",
              formatter: (value, context) => {
                return value;
              },
            },
          },
        },
      });
    }

    // Cleanup: Destroy the chart when the component is unmounted
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [deleteReasonCount]);

  return <canvas ref={chartRef} />;
};

export default BarChart;
