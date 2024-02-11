// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartTimeCount = ({ sagtidSum }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Define colors for each dataset
  const colorTotalSagtid = "rgba(75, 192, 192, 0.6)";
  const borderColorTotalSagtid = "rgba(75, 192, 192, 1)";
  const colorCountSagNr = "rgba(255, 99, 132, 0.6)";
  const borderColorCountSagNr = "rgba(255, 99, 132, 1)";

  useEffect(() => {
    if (sagtidSum) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Create a new array with sagNr from 1 to 7, filling in missing values with 0
      const filledSagtidSum = Array.from({ length: 7 }, (_, i) => {
        const existingItem = sagtidSum.find(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item: any) => item.sagNr === String(i + 1),
        );
        return (
          existingItem || {
            sagNr: String(i + 1),
            totalSagtid: 0,
            countSagNr: 0,
          }
        );
      });

      const ctx = chartRef.current?.getContext("2d");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      chartInstanceRef.current = new Chart<"bar", any[], any>(ctx, {
        type: "bar",
        data: {
          labels: filledSagtidSum.map((item) => item.sagNr),
          datasets: [
            {
              label: "Total Sagtid",
              data: filledSagtidSum.map((item) => item.totalSagtid),
              backgroundColor: colorTotalSagtid,
              borderColor: borderColorTotalSagtid,
              borderWidth: 1,
            },
            {
              label: "Antall serviceposter",
              data: filledSagtidSum.map((item) => item.countSagNr),
              backgroundColor: colorCountSagNr,
              borderColor: borderColorCountSagNr,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [sagtidSum]);

  return <canvas ref={chartRef} />;
};

export default ChartTimeCount;
