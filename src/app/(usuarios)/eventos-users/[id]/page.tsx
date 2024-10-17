"use client";
import useGetActividadesByEventoId from "@/api/getActividadesByEventoId";
import useEventoById from "@/api/getEventoById";
import ActividadesForm from "@/components/ActividadesForm";
import ActividadesList from "@/components/ActividadesList";
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
  console.log("ID EVENTO", eventoId);

  const user = useSelector((state: any) => state.auth);
  const { result, error, loading } = useEventoById(eventoId, user.token);
  const [check, setCheck] = useState(true);
  const {
    result: resultActividades,
    loading: resultLoading,
    error: resultError,
  } = useGetActividadesByEventoId(eventoId, user.token, check);

  useEffect(() => {
    if (error === "Request failed with status code 401") {
      dispatch(clearUser());
      router.push("/");
    }
  }, [error, dispatch, router]);

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
      <h3 className="text-base sm:text-xl text-custom-title dark:text-white font-semibold mt-5">
        {result.descripcion}
      </h3>
      {user?.id === result?.usuarioCreador?.id ||
      user?.id === result?.responsable?.id ? (
        <div className="flex justify-around sm:w-2/6 mt-5 gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-custom-title dark:bg-white text-white dark:text-custom-title hover:bg-sky-950 text-base">
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
            className="dark:bg-sky-600 dark:text-white bg-custom-title text-white rounded-md p-2 shadow-md"
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
    </div>
  );
};

export default EventosIdPage;
