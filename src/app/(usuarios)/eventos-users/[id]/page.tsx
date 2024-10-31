"use client";
import useGetActividadesByEventoId from "@/api/actividades/getActividadesByEventoId";
import useEventoById from "@/api/eventos/getEventoById";
import ActividadesForm from "@/components/ActividadesForm";
import ActividadesList from "@/components/ActividadesList";
import ModalExpired from "@/components/ModalExpired";
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
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const EventosIdPage = () => {
  const params = useParams();
  const eventoId = Array.isArray(params.id) ? params.id[0] : params.id;
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state: any) => state.auth);
  const { result, error, loading } = useEventoById(eventoId, user.token);
  const [check, setCheck] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const {
    result: resultActividades,
    loading: resultLoading,
    error: resultError,
  } = useGetActividadesByEventoId(eventoId, user.token, check);

  useEffect(() => {
    if (error === "Request failed with status code 401") {
      setShowModal(true);
    }
  }, [error, dispatch, router]);

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(clearUser());
    router.push("/");
  };

  if (!result)
    return (
      <div className="flex justify-center">
        <p className="text-3xl text-custom-title dark:text-white">
          No se encontró el proyecto.
        </p>
      </div>
    );

  return (
    <div className="w-full mx-auto mt-5 px-5 py-5 sm:px-12">
      <h1 className="text-xl sm:text-3xl text-custom-title dark:text-white font-bold">
        {result.nombre}
      </h1>
      <h3 className="text-base sm:text-xl text-custom-title dark:text-white font-medium mt-5">
        <span className="font-bold">Descripcion del evento:</span>{" "}
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
      {user?.id === result?.usuarioCreador?.id ||
      user?.id === result?.responsable?.id ? (
        <div className="flex justify-between sm:w-2/6 mt-5 gap-3">
          <AlertDialog>
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
            href={`/eventos-users/${eventoId}/team-eventos-users`}
            className="dark:bg-sky-600 dark:text-white bg-custom-title text-white rounded-md p-2 shadow-md font-bold"
          >
            Colaboradores
          </Link>
        </div>
      ) : null}

      <ActividadesList
        actividades={resultActividades}
        check={check}
        setCheck={setCheck}
      />
      {showModal && <ModalExpired handleCloseModal={handleCloseModal} />}
    </div>
  );
};

export default EventosIdPage;
