"use client";
import useGetActividadesByEventoId from "@/api/getActividadesByEventoId";
import useEventoById from "@/api/getEventoById";
import ActividadesForm from "@/components/ActividadesForm";
import ActividadesList from "@/components/ActividadesList";
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
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const PageProyectoById = () => {
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

  useEffect(() => {
    if (error === "Request failed with status code 401") {
      dispatch(clearUser());
      router.push("/");
    }
  }, [error, dispatch, router]);

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
      <h3 className="text-base sm:text-xl text-custom-title dark:text-white font-semibold mt-5">
        {result.descripcion}
      </h3>
      <h3 className="text-base sm:text-xl text-custom-title dark:text-white  mt-5">
        <span className="font-bold">Descripcion del evento:</span>{" "}
        {result.descripcion}
      </h3>

      {user.id === result.usuarioCreador.id ? (
        <div className="flex justify-around sm:w-2/6 mt-5 gap-3">
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
            href={
              user && user.rol === "Administrador"
                ? `/eventos/${eventoId}/team-eventos-admin`
                : `/eventos-user/${eventoId}/team-eventos-user`
            }
            className="dark:bg-sky-600 dark:text-white bg-custom-title text-white rounded-md p-2 shadow-md"
          >
            Colaboradores
          </Link>
        </div>
      ) : (
        ""
      )}
      <ActividadesList
        actividades={resultActividades}
        check={check}
        setCheck={setCheck}
      />
    </div>
  );
};

export default PageProyectoById;
