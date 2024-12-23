"use client";
import useGetEventosResponsable from "@/api/eventos/getEventosesponsable";
import useGetProjectsResponsable from "@/api/proyectos/getProjectsResponsable";
import TableEventosPending from "@/components/TableEventosPending";
import TableProyectosPending from "@/components/TableProyectosPending";
import { setNotificationCount } from "@/store/notificaciones/notificationSlice";
import { DataEventos } from "@/types/evento.type";
import { TypeProyectos } from "@/types/proyectos.type";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const NotificacionesAdmin = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth);
  const { result } = useGetProjectsResponsable(user.token);
  const { result: resultEvento } = useGetEventosResponsable(user.token);
  const [eventosPendings, setEventosPendings] = useState<DataEventos[] | []>(
    []
  );
  const [proyectosPendings, setProyectosPendings] = useState<
    TypeProyectos[] | []
  >([]);

  useEffect(() => {
    if (result) {
      setProyectosPendings(result);
    }
  }, [result]);

  useEffect(() => {
    if (resultEvento) {
      setEventosPendings(resultEvento);
    }
  }, [resultEvento]);

  useEffect(() => {
    if (proyectosPendings) {
      dispatch(
        setNotificationCount(proyectosPendings.length + eventosPendings.length)
      );
    }
  }, [proyectosPendings, dispatch, eventosPendings]);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 p-10 gap-4">
      <div className="w-full">
        <div className="flex justify-center">
          <h1 className="text-custom-title dark:text-white font-semibold text-xl">
            Proyectos Pendientes
          </h1>
        </div>
        <div className="mt-5 w-full mx-auto">
          <TableProyectosPending
            proyectos={proyectosPendings}
            setProyectosPendings={setProyectosPendings}
          />
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-center">
          <h1 className="text-custom-title dark:text-white font-semibold text-xl">
            Eventos Pendientes
          </h1>
        </div>
        <div className="mt-5 w-full mx-auto">
          <TableEventosPending
            eventos={eventosPendings}
            setEventosPendings={setEventosPendings}
          />
        </div>
      </div>
    </div>
  );
};

export default NotificacionesAdmin;
