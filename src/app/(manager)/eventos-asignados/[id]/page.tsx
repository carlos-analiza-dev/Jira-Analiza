"use client";
import useGetActividadesByEventoId from "@/api/actividades/getActividadesByEventoId";
import useEventoById from "@/api/eventos/getEventoById";
import ActividadesForm from "@/components/ActividadesForm";
import ActividadesList from "@/components/ActividadesList";
import ModalExpired from "@/components/ModalExpired";
import SkeletonProyectos from "@/components/SkeletonProyectos";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { clearUser } from "@/store/auth/sessionSlice";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const EventosPageId = () => {
  const user = useSelector((state: any) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const [check, setCheck] = useState(true);
  const params = useParams();
  const eventoId = Array.isArray(params.id) ? params.id[0] : params.id;
  const { result, error, loading } = useEventoById(eventoId, user.token);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    result: resultActividades,
    loading: resultLoading,
    error: resultError,
  } = useGetActividadesByEventoId(eventoId, user.token, check);

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

  if (loading) return <SkeletonProyectos />;

  if (!result || !result.nombre)
    return (
      <div className="flex justify-center">
        <p className="text-3xl text-custom-title dark:text-white">
          No se encontró el evento.
        </p>
      </div>
    );

  return (
    <div className="w-full mx-auto mt-5">
      <h1 className="text-xl sm:text-3xl text-custom-title dark:text-white font-bold">
        {result.nombre}
      </h1>
      <h3 className="text-base sm:text-xl text-custom-title dark:text-white font-medium  mt-5">
        <span className="font-bold">Descripción del evento:</span>{" "}
        {result.descripcion}
      </h3>
      <div className="mt-3">
        <Button
          onClick={() => router.back()}
          className="bg-custom-title dark:bg-white text-white dark:text-custom-title hover:bg-sky-950 text-base font-bold"
        >
          Eventos
        </Button>
      </div>
      {user.id === result.usuarioCreador.id ||
      user.id === result.responsable.id ? (
        <div className="flex justify-between sm:w-2/6 mt-5 gap-3">
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button className="bg-custom-title dark:bg-white text-white dark:text-custom-title hover:bg-sky-950 text-base font-bold">
                Agregar Actividad
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-custom-title dark:text-white font-bold">
                  Nueva Actividad
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Llena el formulario y crea una actividad.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <ActividadesForm
                eventoId={eventoId}
                check={check}
                setCheck={setCheck}
              />
            </AlertDialogContent>
          </AlertDialog>
          <Link
            href={
              user && user.rol === "Administrador"
                ? `/eventos/${eventoId}/team-eventos-admin`
                : user.rol === "Manager"
                  ? `/eventos-asignados/${eventoId}/team-manager`
                  : `/eventos-user/${eventoId}/team-eventos-user`
            }
            className="dark:bg-sky-600 dark:text-white bg-custom-title text-white rounded-md p-2 shadow-md font-bold"
          >
            Colaboradores
          </Link>
        </div>
      ) : (
        ""
      )}
      <ActividadesList
        eventos={result}
        actividades={resultActividades}
        check={check}
        setCheck={setCheck}
      />
      {showModal && <ModalExpired handleCloseModal={handleCloseModal} />}
    </div>
  );
};

export default EventosPageId;
