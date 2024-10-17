import Link from "next/link";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { EllipsisVertical } from "lucide-react";
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
} from "./ui/alert-dialog";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { DataEventos } from "@/types/evento.type";
import { formatFecha } from "@/helpers/formatDate";
import removeEvento from "@/api/removeEvento";
import FormEventos from "./FormEventos";

interface Props {
  result: DataEventos[];
  check?: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
}

const Eventos = ({ result, setCheck, check }: Props) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const user = useSelector((state: any) => state.auth);
  const [isEdit, setIsEdit] = useState<any>(null);
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      await removeEvento(id, user.token);

      setCheck(!check);

      toast({ title: "Evento eliminado exitosamente" });
    } catch (error) {
      toast({
        title: "Ocurrió un error al eliminar el evento",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (evento: DataEventos) => {
    setIsEdit(evento);
  };

  const handleCloseEdit = () => {
    setIsEdit(null);
  };

  if (!result || result.length === 0) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <p className="text-custom-title dark:text-white">
          No hay eventos aun disponibles para ti.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full">
      {result.map((evento) => (
        <div
          className="bg-gray-50 p-5 rounded-sm mt-4 dark:bg-gray-900"
          key={evento.id}
        >
          {evento.usuarioCreador && user.id === evento.usuarioCreador.id && (
            <div className="sm:w-2/12 mb-4">
              <p className="p-1 bg-custom-title text-white shadow-md rounded-md text-center">
                Manager
              </p>
            </div>
          )}

          {evento.usuarios.some(
            (colaborador) => colaborador.id === user.id
          ) && (
            <div className="sm:w-2/12 mb-4">
              <p className="p-1 bg-green-800 text-white shadow-md rounded-md text-center">
                Colaborador
              </p>
            </div>
          )}

          {evento.responsable && user.id === evento.responsable.id && (
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
                    ? `/eventos/${evento.id}`
                    : `/eventos-users/${evento.id}`
                }
                className="text-3xl font-bold text-custom-title dark:text-white hover:underline"
              >
                {evento.nombre}
              </Link>
              <p className="font-bold text-custom-title dark:text-white text-lg mt-3">
                Tipo Evento:{" "}
                <span className="font-medium text-custom-title dark:text-white">
                  {evento.tipoEvento}
                </span>
              </p>
              <p className="text-lg font-semibold text-custom-title dark:text-white mt-3">
                {evento.descripcion}
              </p>
              <p className="text-sm font-medium text-custom-title dark:text-white mt-3">
                Fecha de Inicio:{" "}
                <span className="">
                  {formatFecha(evento.fechaInicio.toString())}
                </span>
              </p>
              <p className="text-sm font-medium text-custom-title dark:text-white mt-3">
                Estado: <span className="">{evento.estado}</span>
              </p>
            </div>
            <div className="cursor-pointer flex items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <EllipsisVertical />
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  {evento.usuarioCreador &&
                  user.id === evento.usuarioCreador.id ? (
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Link
                          href={
                            user.rol && user.rol === "Administrador"
                              ? `/eventos/${evento.id}`
                              : `/eventos-users/${evento.id}`
                          }
                          className="text-sm text-custom-title dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 block p-2"
                        >
                          Ver evento
                        </Link>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <p
                              onClick={() => handleEdit(evento)}
                              className="text-sm text-custom-title dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 p-2 cursor-pointer"
                            >
                              Editar evento
                            </p>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <div className="flex justify-end">
                                <AlertDialogCancel onClick={handleCloseEdit}>
                                  X
                                </AlertDialogCancel>
                              </div>
                              <AlertDialogTitle className="text-custom-title font-bold dark:text-white">
                                ¿Estas seguro que deseas editar este evento?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-custom-title font-semibold dark:text-white">
                                Debes estar seguro de realizar esta accion.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className="w-full ">
                              <FormEventos
                                check={check ?? true}
                                setCheck={setCheck}
                                setShowDialog={setShowDialog}
                                showDialog={showDialog}
                                evento={isEdit}
                              />
                            </div>
                          </AlertDialogContent>
                        </AlertDialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <p className="text-sm text-red-500  hover:bg-gray-100 dark:hover:bg-gray-900 p-2 cursor-pointer">
                              Eliminar evento
                            </p>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-custom-title font-bold dark:text-white">
                                ¿Estas seguro que deseas eliminar este evento?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-custom-title font-semibold dark:text-white">
                                Debes estar seguro de realizar esta accion.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(evento.id)}
                                className="bg-custom-title text-white dark:bg-white dark:text-custom-title"
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Link
                          href={`/eventos-users/${evento.id}`}
                          className="text-sm text-custom-title dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 block p-2"
                        >
                          Ver evento
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

export default Eventos;
