'use client';

import React from "react";
import dynamic from "next/dynamic";

// FIX: load ApexCharts only on client
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false
});

interface AreaChartProps {
  previous: number;
  current: number;
  label?: string;
  color?: string;
  smoothness?: number;
}

const AreaChart: React.FC<AreaChartProps> = ({
  previous,
  current,
  label = "Value",
  color = "#3B82F6",
  smoothness = 8
}) => {
  const diff = current - previous;
  const percent = previous !== 0 ? ((diff / previous) * 100).toFixed(1) : "0";
  const isIncrease = diff >= 0;

  // Generate smooth curve
  const generateCurve = () => {
    const points: number[] = [];
    for (let i = 0; i <= smoothness; i++) {
      const t = i / smoothness;
      const value = previous + (current - previous) * t;
      points.push(value);
    }
    return points;
  };

  const data = generateCurve();

  const options: ApexCharts.ApexOptions = {
    chart: {
      id: "smooth-single-chart",
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    xaxis: { labels: { show: false } },
    yaxis: { labels: { show: false } },
    stroke: {
      curve: "smooth",
      width: 3
    },
    colors: [color],
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.7,
        opacityTo: 0.15,
        stops: [0, 90, 100]
      }
    },
    grid: { show: false },
    dataLabels: { enabled: false }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="text-xl font-semibold text-white">{current}</div>

        {isIncrease ? (
          <span className="flex items-center text-green-400 text-sm">
            +{percent}%
          </span>
        ) : (
          <span className="flex items-center text-red-400 text-sm">
            {percent}%
          </span>
        )}
      </div>

      <Chart
        options={options}
        series={[{ name: label, data }]}
        type="area"
        height={150}
      />
    </div>
  );
};

export default AreaChart;
