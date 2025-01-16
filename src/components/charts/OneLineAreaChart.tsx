import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import FormLabelElement from "../form/FormLabelElement";

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
    xaxis: {
      categories: labels,
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
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
