import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface PieChartProps {
  className?: string;
  data: number[];
  labels: string[];
  label?: string;
  height?: number;
}

export const PieChart: React.FC<PieChartProps> = ({
  className = "",
  data,
  labels,
  label = "",
  height = 350,
}) => {
  const options: ApexOptions = {
    chart: {
      type: "pie",
      toolbar: {
        show: true,
      },
    },
    labels: labels,
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    title: {
      text: label,
      align: "center",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toFixed(1) + "%";
      },
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val.toString();
        },
      },
    },
  };

  const series = data;

  return (
    <div className={`${className}`}>
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        height={height}
      />
    </div>
  );
};
