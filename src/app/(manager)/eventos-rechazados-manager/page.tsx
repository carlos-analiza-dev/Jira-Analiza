"use client";
import useGetEventosRechazados from "@/api/eventos/eventosRechazados";
import EventosRechazadosTable from "@/components/EventosRechazadosTable";
import SkeletonProyectos from "@/components/SkeletonProyectos";
import { useState } from "react";
import { useSelector } from "react-redux";

const EventosRechazados = () => {
  const user = useSelector((state: any) => state.auth);
  const [check, setCheck] = useState<boolean>(false);
  const { error, result, loading } = useGetEventosRechazados(check, user.token);

  if (loading) {
    return <SkeletonProyectos />;
  }

  return (
    <div className="mx-auto">
      <div className="mt-3">
        <EventosRechazadosTable
          eventos={result}
          check={check}
          setCheck={setCheck}
        />
      </div>
    </div>
  );
};

export default EventosRechazados;
