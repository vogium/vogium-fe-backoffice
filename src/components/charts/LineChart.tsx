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
  const series = [{ name: "Günlük Etkileşimler", data: dailyInteractions }];

  const options: ApexOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
    },
    xaxis: { categories: dailyLabels },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
    title: { text: "", align: "left" },
  };

  return (
    <div className={className}>
      <div className="mb-5">
        <h2 className="font-bold text-lg">{title}</h2>
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={300}
        />
      </div>
      <div className="mt-5">
        <h2 className="font-bold text-lg">Ortalama Etkileşim Oranı</h2>
        <div className="text-2xl">
          {(averageInteractionRatio * 100).toFixed(2)}%
        </div>
      </div>
    </div>
  );
};
