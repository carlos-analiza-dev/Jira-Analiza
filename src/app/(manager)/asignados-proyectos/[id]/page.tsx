"use client";
import useProyectoId from "@/api/proyectos/getProyectoId";
import useTareasProyectosId from "@/api/tareas/getTareasProyectoId";
import ModalExpired from "@/components/ModalExpired";
import SkeletonProyectos from "@/components/SkeletonProyectos";
import TareasForm from "@/components/TareasForm";
import TaskList from "@/components/TaskList";
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

const PageProyectosIdManager = () => {
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
      <div className="mt-3">
        <Button
          onClick={() => router.back()}
          className="bg-custom-title dark:bg-white text-white dark:text-custom-title hover:bg-sky-950 text-base font-bold"
        >
          Proyectos
        </Button>
      </div>
      {user.id === result.creador.id || user.id === result.responsable.id ? (
        <div className="flex justify-between sm:w-2/6 mt-5 gap-3">
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button className="bg-custom-title dark:bg-white text-white dark:text-custom-title hover:bg-sky-950 text-base font-bold">
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
                : user && user.rol === "Manager"
                  ? `/asignados-proyectos/${proyectoId}/team`
                  : `/proyectos/${proyectoId}/team-users`
            }
            className="dark:bg-sky-600 dark:text-white bg-custom-title hover:bg-sky-950 text-white rounded-md p-2 shadow-md font-bold"
          >
            Colaboradores
          </Link>
        </div>
      ) : (
        ""
      )}
      <TaskList
        tareas={resultTareas}
        proyectos={result}
        check={check}
        setCheck={setCheck}
      />
      {showModal && <ModalExpired handleCloseModal={handleCloseModal} />}
    </div>
  );
};

export default PageProyectosIdManager;
