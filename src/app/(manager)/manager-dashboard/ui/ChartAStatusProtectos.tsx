"use client";

import useGetStatusProyectosStatus from "@/api/proyectos/getStatusProyectosAccept";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { ActiveData } from "@/types/active.type";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Cell, Pie, PieChart } from "recharts";

interface DataChart {
  aceptados: number;
  rechazados: number;
  pendientes: number;
}

const ChartStatusProyectos = () => {
  const { result, loading, error } = useGetStatusProyectosStatus();

  const [resultado, setResultado] = useState<DataChart>({
    aceptados: 0,
    pendientes: 0,
    rechazados: 0,
  });

  useEffect(() => {
    if (
      result &&
      typeof result === "object" &&
      "aceptados" in result &&
      "pendientes" in result &&
      "rechazados" in result
    ) {
      setResultado(result as DataChart);
    }
  }, [result]);

  const chartData = [
    { name: "Aceptados", value: resultado.aceptados },
    { name: "Pendientes", value: resultado.pendientes },
    { name: "Rechazados", value: resultado.rechazados },
  ];

  const chartColors = ["#2563eb", "#c1121f", "#588157"];

  const chartConfig: ChartConfig = {
    aceptados: {
      label: "Aceptados",
      color: "#2563eb",
    },
    rechazados: {
      label: "Rechazados",
      color: "#c1121f",
    },
    pendientes: {
      label: "Pendientes",
      color: "#588157",
    },
  };

  return (
    <div className="w-full h-full">
      <p className="text-custom-title font-bold dark:text-white text-center">
        Estado de Proyectos
      </p>

      {loading ? (
        <p className="text-center text-custom-title">Cargando...</p>
      ) : error ? (
        <p className="text-center text-custom-title">Error al cargar datos.</p>
      ) : resultado.pendientes === 0 &&
        resultado.rechazados === 0 &&
        resultado.aceptados === 0 ? (
        <p className="text-center text-custom-title dark:text-white">
          No hay proyectos por mostrar en estos momentos.
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

export default ChartStatusProyectos;
