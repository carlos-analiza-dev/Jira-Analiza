"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { clearUser } from "@/store/auth/sessionSlice";
import { useRouter } from "next/navigation";
import ModalExpired from "@/components/ModalExpired";
import ChartBarras from "./ui/ChartBarras";
import ChartUsuarios from "./ui/ChartUsuarios";
import ChartPastel from "./ui/ChartPastel";
import ChartActivos from "./ui/ChartActivos";
import TotalUsers from "./ui/TotalUsers";
import useGetUsersActivesAndAuth from "@/api/users/getUserActivesAndAutorizados";
import { House, UserCheck, Users, UserX } from "lucide-react";
import useGetActiveUsers from "@/api/users/getActiveUsers";
import { ActiveData } from "@/types/active.type";
import useAllSucursales from "@/api/sucursal/getSucursalesNotPagination";
import useUserByRolPais from "@/api/users/usersByRol";

import useGetUsersByEmpresa from "@/api/users/getUsersByEmpresa";
import EmpresaUsuariosChart from "./ui/EmpresaUsuariosChart ";
import BarraUserByDepto from "./ui/BarraUserByDepto";
import ChartStatusProyectos from "./ui/ChartAStatusProtectos";
import ChartStatusEventos from "./ui/ChartStatusEventos";

export default function DashBoardPage() {
  const pais = useSelector((state: any) => state.country.selectedCountry);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const user = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const { result, error, loading } = useGetUsersActivesAndAuth(user.token);
  const { result: resultInactivos } = useGetActiveUsers(pais);
  const [resultado, setResultado] = useState<ActiveData>({
    activos: 0,
    inactivos: 0,
  });
  const { resultSucursal } = useAllSucursales(user.token, pais);
  const { result: resultUserRol } = useUserByRolPais(user.token, pais);
  const { result: resultEmpresa } = useGetUsersByEmpresa(user.token);

  useEffect(() => {
    if (
      resultInactivos &&
      typeof resultInactivos === "object" &&
      "activos" in resultInactivos &&
      "inactivos" in resultInactivos
    ) {
      setResultado(resultInactivos as ActiveData);
    }
  }, [resultInactivos]);

  useEffect(() => {
    if (!user && !user.token) {
      setShowModal(true);
    }
  }, [dispatch]);

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(clearUser());
    router.push("/");
  };

  return (
    <div className="mx-auto min-h-screen px-6 overflow-y-auto max-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 w-full">
        <div className="flex justify-center items-center">
          <TotalUsers
            title="Total Empleados"
            total={result ? result.length + 1 : 1}
            icon={<Users size={20} />}
          />
        </div>
        <div className="flex justify-center items-center">
          <TotalUsers
            title={`Total usuarios inactivos - ${pais}`}
            total={resultado ? resultado.inactivos : 0}
            icon={<UserX size={20} />}
          />
        </div>
        <div className="flex justify-center items-center">
          <TotalUsers
            title={`Total usuarios activos - ${pais}`}
            total={resultado ? resultado.activos : 0}
            icon={<UserCheck size={20} />}
          />
        </div>
        <div className="flex justify-center items-center">
          <TotalUsers
            title={`Total sucursales - ${pais}`}
            total={resultSucursal ? resultSucursal.length : 0}
            icon={<House size={20} />}
          />
        </div>
        <div className="mt-4 sm:col-span-2">
          <ChartBarras />
        </div>
        <div className="mt-4 flex justify-center items-center sm:col-span-2">
          <BarraUserByDepto data={resultUserRol} />
        </div>
        <div className="mt-8 flex justify-center items-center sm:col-span-2">
          <ChartUsuarios />
        </div>
        <div className="mt-8 flex justify-center items-center sm:col-span-2">
          <EmpresaUsuariosChart data={resultEmpresa} />
        </div>
        <div className="mt-8 flex justify-center items-center sm:col-span-2">
          <ChartStatusProyectos />
        </div>
        <div className="mt-8 flex justify-center items-center sm:col-span-2">
          <ChartStatusEventos />
        </div>
        <div className="mt-8 flex justify-center items-center sm:col-span-2">
          <ChartPastel />
        </div>
        <div className="mt-8 flex justify-center items-center sm:col-span-2">
          <ChartActivos />
        </div>
      </div>
      {showModal && <ModalExpired handleCloseModal={handleCloseModal} />}
    </div>
  );
}
