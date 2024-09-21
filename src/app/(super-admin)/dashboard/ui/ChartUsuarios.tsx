"use client";
import { Pie, PieChart, Cell } from "recharts";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";
import { useState, useEffect } from "react";
import { ActiveData } from "@/types/active.type";
import useGetUsersAutorizados from "@/api/getUsersAutorizados";
import { AutorizadoData } from "@/types/atorizado.type";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { clearUser } from "@/store/auth/sessionSlice";
const ChartUsuarios = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { result, loading, error } = useGetUsersAutorizados();

  useEffect(() => {
    if (error === "Request failed with status code 401") {
      dispatch(clearUser());
      router.push("/unauthorized");
    }
  }, [error, dispatch, router]);

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
    { name: "Autorizados", value: resultado.autorizado },
    { name: "No autorizados", value: resultado.no_autorizado },
  ];

  const chartColors = ["#f16666", "#ef1616"];

  const chartConfig: ChartConfig = {
    activos: {
      label: "Autorizados",
      color: "#f16666",
    },
    iactivos: {
      label: "No autorizados",
      color: "#ef1616",
    },
  };

  return (
    <div>
      <p className="text-custom-title font-bold dark:text-white">
        Actividad de usuarios
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

export default ChartUsuarios;
