"use client";
import { Pie, PieChart, Cell } from "recharts";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";
import { useState, useEffect } from "react";
import useGetUsersAutorizados from "@/api/users/getUsersAutorizados";
import { AutorizadoData } from "@/types/atorizado.type";
import { useSelector } from "react-redux";

const ChartUsuarios = () => {
  const user = useSelector((state: any) => state.auth);

  const pais = user.pais;
  const { result, loading, error } = useGetUsersAutorizados(pais);

  const [resultado, setResultado] = useState<AutorizadoData>({
    autorizado: 0,
    no_autorizado: 0,
  });

  useEffect(() => {
    if (
      result &&
      typeof result === "object" &&
      "autorizado" in result &&
      "no_autorizado" in result
    ) {
      setResultado(result as AutorizadoData);
    }
  }, [result]);

  const chartData = [
    { name: "Auth", value: resultado.autorizado },
    { name: "No auth", value: resultado.no_autorizado },
  ];

  const chartColors = ["#f16666", "#ef1616"];

  const chartConfig: ChartConfig = {
    activos: {
      label: "Auth",
      color: "#f16666",
    },
    iactivos: {
      label: "No auth",
      color: "#ef1616",
    },
  };

  return (
    <div className="h-full w-full">
      <p className="text-custom-title font-bold dark:text-white text-center">
        Autorización de usuarios
      </p>

      <ChartContainer config={chartConfig} className="min-h-full w-full">
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

export default ChartUsuarios;
