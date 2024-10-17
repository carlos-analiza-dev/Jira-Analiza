"use client";
import useColaboradoresByEventoId from "@/api/getColaboradoresByEventotId";
import ColaboradoresEventos from "@/components/ColaboradoresEventos";
import FormColaboradorByEventos from "@/components/FormColaboradorByEventos";
import SkeletonProyectos from "@/components/SkeletonProyectos";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { clearUser } from "@/store/auth/sessionSlice";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PageEventosAdmin = () => {
  const user = useSelector((state: any) => state.auth);
  const [check2, setCheck2] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isClose, setIsClose] = useState(false);
  const params = useParams();
  const eventoId = Array.isArray(params.id) ? params.id[0] : params.id;

  const { error, loading, result } = useColaboradoresByEventoId(
    eventoId,
    user.token,
    check2
  );

  useEffect(() => {
    if (error === "Request failed with status code 401") {
      dispatch(clearUser());
      router.push("/");
    }
  }, [error, dispatch, router]);

  const handleClose = () => {
    setIsClose(false);
  };

  return (
    <div className="max-w-3xl sm:max-w-6xl px-4">
      <div className="mt-5">
        <h1 className="text-3xl text-custom-title font-bold dark:text-white">
          Administrar Equipos
        </h1>
      </div>
      <div className="mt-3">
        <h3 className="text-xl text-custom-title font-bold dark:text-white">
          Administra el equipo de trabajo para este evento.
        </h3>
      </div>
      <div className="mt-3 flex justify-between sm:w-2/6 gap-4">
        <AlertDialog open={isClose} onOpenChange={setIsClose}>
          <AlertDialogTrigger asChild>
            <Button className="bg-custom-title dark:bg-white text-white dark:text-custom-title text-base">
              Agregar Colaborador al evento
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <div className="flex justify-end">
              <AlertDialogCancel>X</AlertDialogCancel>
            </div>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-custom-title font-bold dark:text-white text-xl">
                Agregar integrante al equipo
              </AlertDialogTitle>
              <AlertDialogDescription className="text-custom-title dark:text-white font-semibold">
                Busca el nuevo integrante para agregarlo al evento.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <FormColaboradorByEventos
              onSuccess={handleClose}
              setCheck2={setCheck2}
              check2={check2}
            />
          </AlertDialogContent>
        </AlertDialog>

        <Button
          onClick={() => router.back()}
          className="bg-purple-700 text-white p-2 rounded-md shadow-md dark:bg-purple-700 text-base dark:text-white"
        >
          Volver al evento
        </Button>
      </div>
      <div className="mt-10">
        <h1 className="text-2xl text-custom-title font-bold dark:text-white">
          Miembros Actuales
        </h1>
      </div>
      <div className="h-full flex justify-center mx-auto items-center">
        {loading ? (
          <SkeletonProyectos />
        ) : (
          <ColaboradoresEventos result={result} />
        )}
      </div>
    </div>
  );
};

export default PageEventosAdmin;
