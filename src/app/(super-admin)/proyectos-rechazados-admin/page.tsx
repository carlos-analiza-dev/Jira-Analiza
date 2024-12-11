"use client";
import useGetProyectosRechazados from "@/api/proyectos/proyectosRechazados";
import SkeletonProyectos from "@/components/SkeletonProyectos";
import ProyectoRechazadosTable from "@/components/ProyectoRechazadosTable";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const ProyectosRechazadosPage = () => {
  const user = useSelector((state: any) => state.auth);
  const [check, setCheck] = useState<boolean>(false);
  const { error, result, loading } = useGetProyectosRechazados(
    check,
    user.token
  );

  if (loading) {
    return <SkeletonProyectos />;
  }

  return (
    <div className="mx-auto">
      <div className="mt-3">
        <ProyectoRechazadosTable
          proyectos={result}
          check={check}
          setCheck={setCheck}
        />
      </div>
    </div>
  );
};

export default ProyectosRechazadosPage;
