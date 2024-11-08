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
import useGetUsersBySucursal from "@/api/users/getUsersBySucursal";
import { UserSucursalData } from "@/types/users-sucursales.type";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { clearUser } from "@/store/auth/sessionSlice";
import ModalExpired from "@/components/ModalExpired";

const ChartBarras = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const pais = useSelector((state: any) => state.country.selectedCountry);
  const { result, loading, error } = useGetUsersBySucursal(pais);

  useEffect(() => {
    if (error === "Request failed with status code 401") {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(clearUser());
    router.push("/");
  };

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
      {chartData.length === 0 ? ( // Verificamos si no hay datos
        <p className="text-center text-custom-title dark:text-white font-semibold mt-5">
          No hay sucursales disponibles.
        </p>
      ) : (
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
      )}
      {showModal && <ModalExpired handleCloseModal={handleCloseModal} />}
    </div>
  );
};

export default ChartBarras;
