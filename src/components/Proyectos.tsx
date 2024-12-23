import { TypeProyectos } from "@/types/proyectos.type";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatFecha } from "@/helpers/formatDate";

import { useEffect, useState } from "react";
import deleteProyecto from "@/api/proyectos/deleteProyecto";
import { useToast } from "@/components/ui/use-toast";
import FormProyectos from "./FormProyectos";
import Image from "next/image";
interface Props {
  proyectos: [] | TypeProyectos[];
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
  check: boolean;
}
const Proyectos = ({ proyectos }: Props) => {
  const user = useSelector((state: any) => state.auth);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [proyect, setProyect] = useState<TypeProyectos[] | []>([]);

  useEffect(() => {
    setProyect(proyectos);
  }, [proyectos]);

  const handleDeleteProyecto = async (proyectoId: string) => {
    setLoading(true);
    try {
      const response = await deleteProyecto(proyectoId, user.token);
      setProyect((statusProyecto) =>
        statusProyecto.filter((proyecto) => proyecto.id !== proyectoId)
      );
      toast({ title: "Proyecto eliminado exitosamente" });
    } catch (error) {
      toast({
        title: "Ocurrio un error al eliminar el proyecto",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSuccess = () => {
    setOpenEditDialog(false);
  };

  if (!proyect || proyect.length === 0) {
    return (
      <div className="block mb-20">
        <div className="flex justify-center mt-10">
          <Image src="proyectos.svg" alt="NotFound" width={500} height={500} />
        </div>
        <div className="mt-5">
          <p className="text-center font-bold text-custom-title text-2xl dark:text-white">
            No se encontraron proyectos disponibles.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="mx-auto w-full">
      {proyect.map((proyecto) => (
        <div
          className="bg-gray-50 p-5 rounded-sm mt-4 dark:bg-gray-900"
          key={proyecto.id}
        >
          {proyecto.creador && user.id === proyecto.creador.id && (
            <div className="sm:w-2/12 mb-4">
              <p className="p-1 bg-custom-title text-white shadow-md rounded-md text-center">
                Manager
              </p>
            </div>
          )}

          {proyecto.usuarios.some(
            (colaborador) => colaborador.id === user.id
          ) && (
            <div className="sm:w-2/12 mb-4">
              <p className="p-1 bg-green-800 text-white shadow-md rounded-md text-center">
                Colaborador
              </p>
            </div>
          )}

          {proyecto.responsable && user.id === proyecto.responsable.id && (
            <div className="sm:w-2/12 mb-4">
              <p className="p-1 bg-sky-800 text-white shadow-md rounded-md text-center">
                Responsable
              </p>
            </div>
          )}
          <div className="flex justify-between items-center">
            <div>
              <Link
                href={
                  user.rol && user.rol === "Administrador"
                    ? `/admin-proyectos/${proyecto.id}`
                    : user.rol && user.rol === "Manager"
                      ? `/asignados-proyectos/${proyecto.id}`
                      : `/proyectos/${proyecto.id}`
                }
                className="text-3xl font-bold text-custom-title dark:text-white hover:underline"
              >
                {proyecto.nombre}
              </Link>
              <p className="font-bold text-custom-title dark:text-white text-lg mt-3">
                Cliente:{" "}
                <span className="font-medium text-custom-title dark:text-white">
                  {proyecto.cliente}
                </span>
              </p>
              <p className="font-bold text-custom-title dark:text-white text-lg mt-3">
                Empresa:{" "}
                <span className="font-medium text-custom-title dark:text-white">
                  {proyecto.empresa ? proyecto.empresa.nombre : "ND"}
                </span>
              </p>
              <p className="text-lg font-semibold text-custom-title dark:text-white mt-3">
                {proyecto.descripcion}
              </p>
              <p className="text-sm font-medium text-custom-title dark:text-white mt-3">
                Creado:{" "}
                <span className="">{formatFecha(proyecto.fechaCreacion)}</span>
              </p>
              <p className="text-sm font-medium text-custom-title dark:text-white mt-3">
                Estado: <span className="">{proyecto.estado}</span>
              </p>
            </div>
            <div className="cursor-pointer flex items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <EllipsisVertical />
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  {proyecto.creador && user.id === proyecto.creador.id && (
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Link
                          href={
                            user.rol && user.rol === "Administrador"
                              ? `/admin-proyectos/${proyecto.id}`
                              : user.rol && user.rol === "Manager"
                                ? `/asignados-proyectos/${proyecto.id}`
                                : `/proyectos/${proyecto.id}`
                          }
                          className="text-sm text-custom-title dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 block p-2"
                        >
                          Ver Proyecto
                        </Link>
                        <AlertDialog
                          open={openEditDialog}
                          onOpenChange={setOpenEditDialog}
                        >
                          <AlertDialogTrigger asChild>
                            <p className="text-sm text-custom-title dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 p-2 cursor-pointer">
                              Editar Proyecto
                            </p>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <div className="flex justify-end">
                                <AlertDialogCancel>X</AlertDialogCancel>
                              </div>
                              <AlertDialogTitle className="text-custom-title font-bold dark:text-white">
                                ¿Estas seguro que deseas editar este proyecto?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-custom-title font-semibold dark:text-white">
                                Debes estar seguro de realizar esta accion.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className="w-full flex justify-center">
                              <FormProyectos
                                proyecto={proyecto}
                                onSuccess={handleUpdateSuccess}
                              />
                            </div>
                          </AlertDialogContent>
                        </AlertDialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <p className="text-sm text-red-500  hover:bg-gray-100 dark:hover:bg-gray-900 p-2 cursor-pointer">
                              Eliminar Proyecto
                            </p>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-custom-title font-bold dark:text-white">
                                ¿Estas seguro que deseas eliminar este proyecto?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-custom-title font-semibold dark:text-white">
                                Debes estar seguro de realizar esta accion.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleDeleteProyecto(proyecto.id)
                                }
                                disabled={loading}
                                className="bg-custom-title text-white dark:bg-white dark:text-custom-title"
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  )}
                  {proyecto.responsable &&
                    user.id === proyecto.responsable.id && (
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <Link
                            href={
                              user.rol && user.rol === "Administrador"
                                ? `/admin-proyectos/${proyecto.id}`
                                : user.rol && user.rol === "Manager"
                                  ? `/asignados-proyectos/${proyecto.id}`
                                  : `/proyectos/${proyecto.id}`
                            }
                            className="text-sm text-custom-title dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 block p-2"
                          >
                            Ver Proyecto
                          </Link>
                        </div>
                      </div>
                    )}
                  {proyecto.usuarios.some(
                    (colaborador) => colaborador.id === user.id
                  ) && (
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Link
                          href={
                            user.rol && user.rol === "Administrador"
                              ? `/admin-proyectos/${proyecto.id}`
                              : user.rol && user.rol === "Manager"
                                ? `/asignados-proyectos/${proyecto.id}`
                                : `/proyectos/${proyecto.id}`
                          }
                          className="text-sm text-custom-title dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 block p-2"
                        >
                          Ver proyecto
                        </Link>
                      </div>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Proyectos;
