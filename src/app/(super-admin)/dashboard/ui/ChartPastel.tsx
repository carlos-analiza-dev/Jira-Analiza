"use client";

import { Pie, PieChart, Cell } from "recharts";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";

const chartData = [
  { name: "Desktop", value: 1224 },
  { name: "Mobile", value: 860 },
];

const chartColors = ["#2563eb", "#60a5fa"];

const chartConfig: ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
};

const ChartPastel = () => {
  return (
    <div>
      <p className="text-custom-title font-bold dark:text-white">
        Productos más vendidos
      </p>

      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={chartColors[index % chartColors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
};

export default ChartPastel;
