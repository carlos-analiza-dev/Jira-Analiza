"use client";
import useColaboradoresByProyecto from "@/api/proyectos/getColaboradoresByProyecto";
import Colaboradores from "@/components/Colaboradores";
import FormColaborador from "@/components/FormColaborador";
import ModalExpired from "@/components/ModalExpired";
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
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const TeamManager = () => {
  const user = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [check, setCheck] = useState(false);
  const [isClose, setIsClose] = useState(false);
  const params = useParams();
  const proyectoId = Array.isArray(params.id) ? params.id[0] : params.id;

  const { error, loading, result } = useColaboradoresByProyecto(
    proyectoId,
    user.token,
    check
  );

  const [showModal, setShowModal] = useState(false);

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

  const handleClose = () => {
    setIsClose(false);
  };

  return (
    <div className="w-full px-4">
      <div className="mt-5">
        <h1 className="text-3xl text-custom-title font-bold dark:text-white">
          Administrar Equipos
        </h1>
      </div>
      <div className="mt-3">
        <h3 className="text-xl text-custom-title font-bold dark:text-white">
          Administra el equipo de trabajo para este proyecto.
        </h3>
      </div>
      <div className="mt-3 flex justify-between sm:w-2/6 gap-4">
        <AlertDialog open={isClose} onOpenChange={setIsClose}>
          <AlertDialogTrigger asChild>
            <Button className="bg-custom-title dark:bg-white text-white dark:text-custom-title text-base">
              Agregar Colaborador
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
                Busca el nuevo integrante para agregarlo al proyecto.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <FormColaborador
              onSuccess={handleClose}
              setCheck={setCheck}
              check={check}
            />
          </AlertDialogContent>
        </AlertDialog>

        <Button
          onClick={() => router.back()}
          className="bg-purple-700 text-white p-2 rounded-md shadow-md dark:bg-purple-700 text-base dark:text-white"
        >
          Volver al proyecto
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
          <Colaboradores result={result} setCheck={setCheck} check={check} />
        )}
      </div>
      {showModal && <ModalExpired handleCloseModal={handleCloseModal} />}
    </div>
  );
};

export default TeamManager;
