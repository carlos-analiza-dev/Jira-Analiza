"use client";
import useGetEventosRechazados from "@/api/eventos/eventosRechazados";
import EventosRechazadosTable from "@/components/EventosRechazadosTable";
import SkeletonProyectos from "@/components/SkeletonProyectos";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EventosRechazados = () => {
  const user = useSelector((state: any) => state.auth);
  const [check, setCheck] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const { error, result, loading } = useGetEventosRechazados(
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
      <div className="flex justify-center">
        <p className="text-custom-title dark:text-white font-bold md:text-2xl">
          Listado de eventos que te han rechazado.{" "}
        </p>
      </div>
      <div className="mt-3">
        <EventosRechazadosTable
          eventos={result}
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

export default EventosRechazados;
