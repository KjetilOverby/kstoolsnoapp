/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartComponent = ({ data }) => {
  const chartRef = useRef(null);
  const myChartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Destroy previous chart if it exists
    if (myChartRef.current) {
      myChartRef.current.destroy();
    }

    // Get unique sagNr and feilkode values
    const sagNrs = [...new Set(data?.map((item) => item.sagNr))].sort(
      (a, b) => a - b,
    );
    const feilkodes = [...new Set(data?.map((item) => item.feilkode))];

    // Initialize dataset with 0 counts
    const datasets = feilkodes.map((feilkode) => ({
      label: feilkode,
      data: new Array(sagNrs.length).fill(0),
      backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16), // Random color
    }));

    // Fill dataset with actual counts
    data?.forEach((item) => {
      const sagNrIndex = sagNrs.indexOf(item.sagNr);
      const dataset = datasets.find(
        (dataset) => dataset.label === item.feilkode,
      );
      dataset.data[sagNrIndex] = item._count;
    });

    // Create new chart and save reference to it
    myChartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: sagNrs,
        datasets,
      },
      options: {
        responsive: true,
        scales: {
          x: { beginAtZero: true },
          y: { beginAtZero: true },
        },
      },
    });
  }, [data]); // Add data to the dependency array

  return <canvas ref={chartRef} />;
};

export default ChartComponent;
