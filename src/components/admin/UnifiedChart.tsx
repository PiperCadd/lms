"use client";

import dynamic from "next/dynamic";
import React from "react";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type ChartType = "area" | "bar" | "radial";

interface UnifiedChartProps {
  type: ChartType;
  series: any[]; // Apex series
  categories?: string[]; // for area/bar
  height?: number | string;
  primaryColor?: string;
  secondaryColor?: string;
}

const UnifiedChart: React.FC<UnifiedChartProps> = ({
  type,
  series,
  categories = [],
  height = "100%",
  primaryColor = "#C3FF43",
  secondaryColor = "#1C2340",
}) => {
  const areaOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      sparkline: { enabled: true },
    },
    stroke: { curve: "smooth", width: 3, colors: [primaryColor] },
    colors: [primaryColor],
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: [`${primaryColor}10`],
        opacityFrom: 0.6,
        opacityTo: 0.03,
      },
    },
    xaxis: {
      categories,
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { labels: { show: false } },
    grid: { show: false },
    dataLabels: { enabled: false },
    tooltip: { theme: "dark" },
  };

  const barOptions: ApexCharts.ApexOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    plotOptions: { bar: { borderRadius: 4, columnWidth: "40%" } },
    colors: ["#ffb75e", "#7cc8ff"],
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 0,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
        // bottom colors for each bar
        gradientToColors: [
          "#ff7f00", // orange bottom
          "#2a9df4", // blue bottom
        ],
      },
    },
    xaxis: { categories, labels: { style: { colors: "#9BA4D8" } } },
    yaxis: { labels: { show: false } },
    grid: { show: false },
    dataLabels: { enabled: false },
    tooltip: { theme: "dark" },
    legend: { labels: { colors: "#9BA4D8" } },
  };

  const radialOptions: ApexCharts.ApexOptions = {
    chart: { type: "radialBar", sparkline: { enabled: true } },
    colors: [primaryColor],
    plotOptions: {
      radialBar: {
        hollow: { size: "60%" },
        track: { background: secondaryColor },
        dataLabels: { show: false },
      },
    },
    stroke: { lineCap: "round" },
  };

  const options =
    type === "area" ? areaOptions : type === "bar" ? barOptions : radialOptions;

  // map our `type` to apex `type` string
  const apexType = type === "radial" ? "radialBar" : type;

  return (
    <ApexChart
      options={options}
      series={series}
      type={apexType}
      height={height}
    />
  );
};

export default UnifiedChart;
