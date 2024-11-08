"use client";

import { Pie, PieChart, Cell } from "recharts";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { StatusProyectos } from "@/types/proyectos-status.type";
import useGetStatusProyectos from "@/api/proyectos/getStatusProyectos";

const ChartPastel = () => {
  const { result, loading, error } = useGetStatusProyectos();

  const [resultado, setResultado] = useState<StatusProyectos>({
    progreso: 0,
    finalizado: 0,
  });

  useEffect(() => {
    if (
      result &&
      typeof result === "object" &&
      "progreso" in result &&
      "finalizado" in result
    ) {
      setResultado(result as StatusProyectos);
    }
  }, [result]);

  const chartData = [
    { name: "En Progreso", value: resultado.progreso },
    { name: "Finalizado", value: resultado.finalizado },
  ];

  const chartColors = ["#d62645", "#d05f74"];

  const chartConfig: ChartConfig = {
    progreso: {
      label: "En Progreso",
      color: "#d62645",
    },
    finalizado: {
      label: "Finalizado",
      color: "#d05f74",
    },
  };

  // Condición para verificar si los datos son cero
  const isDataEmpty = resultado.progreso === 0 && resultado.finalizado === 0;

  return (
    <div>
      <p className="text-custom-title text-center font-bold dark:text-white">
        Seguimiento de proyectos
      </p>

      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        {isDataEmpty ? (
          <p className="text-center mt-10 text-xl">No hay datos disponibles</p>
        ) : (
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
        )}
      </ChartContainer>
    </div>
  );
};

export default ChartPastel;
