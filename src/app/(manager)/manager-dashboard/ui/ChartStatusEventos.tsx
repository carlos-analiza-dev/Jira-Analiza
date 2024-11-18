"use client";

import useGetStatusEventosStatus from "@/api/eventos/getStatusEventosAccept";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart } from "recharts";

interface DataChart {
  aceptados: number;
  rechazados: number;
  pendientes: number;
}

const ChartStatusEventos = () => {
  const { result, loading, error } = useGetStatusEventosStatus();

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

  const chartColors = ["#ffb703", "#0077b6", "#2a9d8f"];

  const chartConfig: ChartConfig = {
    aceptados: {
      label: "Aceptados",
      color: "#ffb703",
    },
    rechazados: {
      label: "Rechazados",
      color: "#0077b6",
    },
    pendientes: {
      label: "Pendientes",
      color: "#2a9d8f",
    },
  };

  return (
    <div className="w-full h-full">
      <p className="text-custom-title font-bold dark:text-white text-center">
        Estado de Eventos
      </p>

      {loading ? (
        <p className="text-center text-custom-title">Cargando...</p>
      ) : error ? (
        <p className="text-center text-custom-title">Error al cargar datos.</p>
      ) : resultado.pendientes === 0 &&
        resultado.rechazados === 0 &&
        resultado.aceptados === 0 ? (
        <p className="text-center text-custom-title dark:text-white">
          No hay eventos por mostrar en estos momentos.
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

export default ChartStatusEventos;
