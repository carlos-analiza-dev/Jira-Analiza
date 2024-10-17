"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
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
import Link from "next/link";
import TareasForm from "@/components/TareasForm";
import TaskList from "@/components/TaskList";
import useProyectoId from "@/api/getProyectoId";
import useTareasProyectosId from "@/api/getTareasProyectoId";
import { clearUser } from "@/store/auth/sessionSlice";

const PageProyectoId = () => {
  const user = useSelector((state: any) => state.auth);
  const [check, setCheck] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const proyectoId = Array.isArray(params.id) ? params.id[0] : params.id;
  const { result, loading, error } = useProyectoId(proyectoId, user.token);

  const {
    result: resultTareas,
    loading: resultLoading,
    error: resultError,
  } = useTareasProyectosId(proyectoId, user.token, check);

  useEffect(() => {
    if (error === "Request failed with status code 401") {
      dispatch(clearUser());
      router.push("/");
    }
  }, [error, dispatch, router]);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  if (loading) return <SkeletonProyectos />;

  if (!result || !result.nombre)
    return (
      <div className="flex justify-center">
        <p className="text-3xl text-custom-title dark:text-white">
          No se encontró el proyecto.
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

      {user.id === result.creador.id ? (
        <div className="flex justify-around sm:w-2/6 mt-5 gap-3">
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button className="bg-custom-title dark:bg-white text-white dark:text-custom-title hover:bg-sky-950 text-base">
                Agregar Tarea
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-custom-title dark:text-white font-bold">
                  Nueva Tarea
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Llena el formulario y crea una tarea.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <TareasForm
                proyectoId={proyectoId}
                check={check}
                setCheck={setCheck}
                onClose={handleCloseDialog}
              />
            </AlertDialogContent>
          </AlertDialog>
          <Link
            href={
              user && user.rol === "Administrador"
                ? `/admin-proyectos/${proyectoId}/team`
                : `/proyectos/${proyectoId}/team-users`
            }
            className="dark:bg-sky-600 dark:text-white bg-custom-title text-white rounded-md p-2 shadow-md"
          >
            Colaboradores
          </Link>
        </div>
      ) : (
        ""
      )}
      <TaskList tareas={resultTareas} check={check} setCheck={setCheck} />
    </div>
  );
};

export default PageProyectoId;
