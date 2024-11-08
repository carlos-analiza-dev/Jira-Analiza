"use client";

import useGetActiveUsers from "@/api/users/getActiveUsers";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { ActiveData } from "@/types/active.type";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Cell, Pie, PieChart } from "recharts";

const ChartActivos = () => {
  const pais = useSelector((state: any) => state.country.selectedCountry);
  const { result, loading, error } = useGetActiveUsers(pais);

  const [resultado, setResultado] = useState<ActiveData>({
    activos: 0,
    inactivos: 0,
  });

  useEffect(() => {
    if (
      result &&
      typeof result === "object" &&
      "activos" in result &&
      "inactivos" in result
    ) {
      setResultado(result as ActiveData);
    }
  }, [result]);

  const chartData = [
    { name: "Activos", value: resultado.activos },
    { name: "Inactivos", value: resultado.inactivos },
  ];

  const chartColors = ["#2563eb", "#60a5fa"];

  const chartConfig: ChartConfig = {
    activos: {
      label: "Activos",
      color: "#2563eb",
    },
    inactivos: {
      label: "Inactivos",
      color: "#60a5fa",
    },
  };

  return (
    <div>
      <p className="text-custom-title font-bold dark:text-white text-center">
        Actividad de usuarios
      </p>

      {loading ? (
        <p className="text-center text-custom-title">Cargando...</p>
      ) : error ? (
        <p className="text-center text-custom-title">Error al cargar datos.</p>
      ) : resultado.activos === 0 && resultado.inactivos === 0 ? (
        <p className="text-center text-custom-title dark:text-white">
          No hay usuarios activos o inactivos.
        </p>
      ) : (
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
      )}
    </div>
  );
};

export default ChartActivos;
