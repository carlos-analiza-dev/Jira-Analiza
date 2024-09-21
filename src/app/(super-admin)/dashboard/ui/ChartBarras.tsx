"use client";

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import useGetUsersBySucursal from "@/api/getUsersBySucursal";
import { UserSucursalData } from "@/types/users-sucursales.type";
import { useDispatch } from "react-redux";
import { clearUser } from "@/store/auth/sessionSlice";
import { useRouter } from "next/navigation";

const ChartBarras = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { result: data, loading, error } = useGetUsersBySucursal();

  useEffect(() => {
    if (error === "Request failed with status code 401") {
      dispatch(clearUser());
      router.push("/unauthorized");
    }
  }, [error, dispatch, router]);

  const [chartData, setChartData] = useState<UserSucursalData[]>([]);

  useEffect(() => {
    if (data) {
      const transformedData = data.map((item: UserSucursalData) => ({
        sucursal: item.sucursal,
        cantidadUsuarios: Number(item.cantidadUsuarios),
      }));
      setChartData(transformedData);
    }
  }, [data]);

  const chartConfig = {
    cantidadUsuarios: {
      label: "Cantidad de Usuarios",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <div>
      <p className="text-custom-title font-bold dark:text-white">
        Usuarios por Sucursal
      </p>

      <ChartContainer
        config={chartConfig}
        className="min-h-[200px] w-full mt-5"
      >
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="sucursal" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="cantidadUsuarios"
            fill={chartConfig.cantidadUsuarios.color}
            radius={4}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default ChartBarras;
