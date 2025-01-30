import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

type LineChartProps = {
  dailyInteractions: number[];
  dailyLabels: string[];
  averageInteractionRatio: number;
  title?: string;
  className?: string;
};

export const LineChart: React.FC<LineChartProps> = ({
  dailyInteractions,
  dailyLabels,
  averageInteractionRatio,
  title = "",
  className = "",
}) => {
  const series = [
    {
      name: "Günlük Etkileşimler",
      data: dailyInteractions,
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ["#7f3d5b"], // Brand color
    xaxis: {
      categories: dailyLabels,
      labels: {
        style: {
          colors: "#64748b", // slate-500
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#64748b", // slate-500
        },
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    grid: {
      borderColor: "#e2e8f0", // slate-200
      strokeDashArray: 4,
    },
    tooltip: {
      theme: "light",
      x: {
        show: true,
      },
      y: {
        title: {
          formatter: () => "Etkileşim",
        },
      },
    },
    markers: {
      size: 4,
      colors: ["#7f3d5b"],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
  };

  return (
    <div className={className}>
      <div className="mb-5">
        <h2 className="font-bold text-lg text-gray-800">{title}</h2>
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={300}
        />
      </div>
      <div className="mt-5">
        <h2 className="font-bold text-lg text-gray-800">
          Ortalama Etkileşim Oranı
        </h2>
        <div className="text-2xl text-brand">
          {(averageInteractionRatio * 100).toFixed(2)}%
        </div>
      </div>
    </div>
  );
};
