"use client";
import useProyectoId from "@/api/proyectos/getProyectoId";
import SkeletonProyectos from "@/components/SkeletonProyectos";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useTareasProyectosId from "@/api/tareas/getTareasProyectoId";
import { clearUser } from "@/store/auth/sessionSlice";
import Link from "next/link";
import TareasForm from "@/components/TareasForm";
import TaskList from "@/components/TaskList";
import ModalExpired from "@/components/ModalExpired";

const PageProyectoId = () => {
  const user = useSelector((state: any) => state.auth);
  const [check, setCheck] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const proyectoId = Array.isArray(params.id) ? params.id[0] : params.id;
  const { result, loading, error } = useProyectoId(proyectoId, user.token);
  const [showModal, setShowModal] = useState(false);
  const {
    result: resultTareas,
    loading: resultLoading,
    error: resultError,
  } = useTareasProyectosId(proyectoId, user.token, check);

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

  if (!result)
    return (
      <div className="flex justify-center">
        <p className="text-3xl text-custom-title dark:text-white">
          No se encontró el proyecto.
        </p>
      </div>
    );

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="w-full mx-auto mt-5 px-5 py-5 sm:px-12">
      <h1 className="text-xl sm:text-3xl text-custom-title dark:text-white font-bold">
        {result.nombre}
      </h1>
      <h3 className="text-base sm:text-xl text-custom-title dark:text-white font-medium mt-5">
        <span className="font-bold">Descripción del proyecto:</span>{" "}
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
      {user?.id === result?.creador?.id ||
      user?.id === result?.responsable?.id ? (
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
            href={`/proyectos/${proyectoId}/team-users`}
            className="dark:bg-sky-600 dark:text-white bg-custom-title text-white rounded-md p-2 shadow-md font-bold"
          >
            Colaboradores
          </Link>
        </div>
      ) : null}
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

export default PageProyectoId;
