"use client";
import { useEffect, useState } from "react";
import ChartActivos from "./ui/ChartActivos";
import ChartBarras from "./ui/ChartBarras";
import ChartPastel from "./ui/ChartPastel";
import ChartUsuarios from "./ui/ChartUsuarios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { clearUser } from "@/store/auth/sessionSlice";
import { useRouter } from "next/navigation";
import ModalExpired from "@/components/ModalExpired";
import TotalUsers from "./ui/TotalUsers";
import { House, UserCheck, UserX } from "lucide-react";
import useGetUsersActivesAndAuth from "@/api/users/getUserActivesAndAutorizados";
import useGetActiveUsers from "@/api/users/getActiveUsers";
import { ActiveData } from "@/types/active.type";
import useAllSucursales from "@/api/sucursal/getSucursalesNotPagination";
import useUserByRolPais from "@/api/users/usersByRol";
import BarraUserByDepto from "./ui/BarraUserByDepto";

export default function DashBoardPage() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const user = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const { result, error, loading } = useGetUsersActivesAndAuth(user.token);
  const { result: resultInactivos } = useGetActiveUsers(user.pais);
  const [resultado, setResultado] = useState<ActiveData>({
    activos: 0,
    inactivos: 0,
  });
  const { resultSucursal } = useAllSucursales(user.token, user.pais);
  const { result: resultUserRol } = useUserByRolPais(user.token, user.pais);

  useEffect(() => {
    if (
      resultInactivos &&
      typeof resultInactivos === "object" &&
      "activos" in resultInactivos &&
      "inactivos" in resultInactivos
    ) {
      setResultado(resultInactivos as ActiveData);
    }
  }, [resultInactivos, user]);

  useEffect(() => {
    if (!user && !user.token) {
      setShowModal(true);
    }
  }, [dispatch, user]);

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(clearUser());
    router.push("/");
  };

  return (
    <div className="mx-auto min-h-screen px-6 overflow-y-auto max-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full">
        <div className="flex justify-center items-center">
          <TotalUsers
            title={`Total usuarios inactivos`}
            total={resultado ? resultado.inactivos : 0}
            icon={<UserX size={20} />}
          />
        </div>
        <div className="flex justify-center items-center">
          <TotalUsers
            title={`Total usuarios activos `}
            total={resultado ? resultado.activos : 0}
            icon={<UserCheck size={20} />}
          />
        </div>
        <div className="flex justify-center items-center">
          <TotalUsers
            title={`Total sucursales `}
            total={resultSucursal ? resultSucursal.length : 0}
            icon={<House size={20} />}
          />
        </div>
        <div className="flex justify-center items-center mt-4 w-full sm:col-span-2">
          <ChartBarras />
        </div>
        <div className="flex justify-center items-center mt-4 w-full">
          <ChartUsuarios />
        </div>
        <div className="mt-4 flex justify-center items-center sm:col-span-2">
          <BarraUserByDepto data={resultUserRol} />
        </div>
        <div className="flex justify-center items-center mt-4 w-full">
          <ChartPastel />
        </div>
        <div className="flex justify-center items-center mt-4 w-full">
          <ChartActivos />
        </div>
      </div>
      {showModal && <ModalExpired handleCloseModal={handleCloseModal} />}
    </div>
  );
}
