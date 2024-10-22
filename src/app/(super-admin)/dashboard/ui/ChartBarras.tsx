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
  const { result, loading, error } = useGetUsersBySucursal();

  useEffect(() => {
    if (error === "Request failed with status code 401") {
      dispatch(clearUser());
      router.push("/");
    }
  }, [error, dispatch, router]);

  // Inicializamos el estado como un array vacío
  const [chartData, setChartData] = useState<UserSucursalData[]>([]);

  useEffect(() => {
    if (result && Array.isArray(result)) {
      const transformedData = result.map((item: UserSucursalData) => ({
        sucursal: item.sucursal,
        cantidadUsuarios: Number(item.cantidadUsuarios),
      }));
      setChartData(transformedData);
    }
  }, [result]); // Usamos `result` directamente en lugar de `data`

  const chartConfig = {
    cantidadUsuarios: {
      label: "Cantidad de Usuarios",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <div>
      <p className="text-custom-title font-bold dark:text-white text-center">
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
