import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import FormLabelElement from "../form/elements/FormLabelElement";

type OneLineAreaChartProps = {
  data: number[];
  labels: string[];
  className?: string;
  label: string;
};

export const OneLineAreaChart: React.FC<OneLineAreaChartProps> = ({
  data,
  labels,
  className = "",
  label,
}) => {
  const series = [
    {
      name: "Series 1",
      data: data,
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
    },
    colors: ["#7f3d5b"], // Brand color
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.55,
        stops: [0, 100],
      },
    },
    xaxis: {
      categories: labels,
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
          formatter: () => "",
        },
      },
    },
  };

  return (
    <div className={className}>
      <FormLabelElement
        id={Math.random().toString(36).substring(7)}
        label={label}
      />

      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={300}
      />
    </div>
  );
};
