"use client";
import useGetProyectosRechazados from "@/api/proyectos/proyectosRechazados";
import ProyectoRechazadosTable from "@/components/ProyectoRechazadosTable";
import SkeletonProyectos from "@/components/SkeletonProyectos";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RechazadosManager = () => {
  const user = useSelector((state: any) => state.auth);
  const [check, setCheck] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);

  const { error, result, loading } = useGetProyectosRechazados(
    check,
    user.token,
    limit,
    offset
  );

  useEffect(() => {
    if (result) {
      setTotalPages(Math.ceil(result.total / limit));
    }
  }, [result, limit]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setOffset((page - 1) * limit);
  };

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
      <div className="flex justify-between mt-5">
        <Button
          className="bg-custom-title text-white dark:bg-white dark:text-custom-title font-bold"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Anterior
        </Button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <Button
          className="bg-custom-title text-white dark:bg-white dark:text-custom-title font-bold"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default RechazadosManager;
