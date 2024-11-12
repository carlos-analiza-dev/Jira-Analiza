import { ResponseProyectos, TypeProyectos } from "@/types/proyectos.type";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { useEffect, useState } from "react";

import { Pencil, Trash2 } from "lucide-react";
import deleteProyecto from "@/api/proyectos/deleteProyecto";
import { useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import FormProyectos from "@/components/FormProyectos";
interface Props {
  result: ResponseProyectos;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
  check: boolean;
}
const TableProyectosManager = ({ result }: Props) => {
  const { toast } = useToast();
  const user = useSelector((state: any) => state.auth);
  const [proyectos, setProyectos] = useState<ResponseProyectos | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [detailsProyecto, setDetailsProyecto] = useState<TypeProyectos | null>(
    null
  );
  useEffect(() => {
    if (result && result.proyectos) {
      setProyectos(result);
    }
  }, [result]);

  const handleDeleteProyecto = async (proyectoId: string) => {
    try {
      const response = await deleteProyecto(proyectoId, user.token);

      toast({ title: "Proyecto eliminado exitosamente." });
      setProyectos((prevProjects) => {
        if (prevProjects) {
          return {
            ...prevProjects,
            proyectos: prevProjects.proyectos.filter(
              (proyecto) => proyecto.id !== proyectoId
            ),
          };
        }
        return null;
      });
    } catch (error) {
      toast({ title: "Ocurrio un error al momento de eliminar el proyecto." });
    }
  };

  const handleUpdateSuccess = () => {
    setOpenEditDialog(false);
  };

  if (!proyectos || proyectos.proyectos.length === 0) {
    return (
      <div className="block mb-20">
        <div className="flex justify-center mt-10">
          <Image
            src="proyectos_manager.svg"
            alt="NotFound"
            width={500}
            height={500}
          />
        </div>
        <div className="mt-5">
          <p className="text-center font-bold text-custom-title text-2xl dark:text-white">
            No se encontraron proyectos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Table className="mt-5 mb-5 px-10">
      <TableCaption className="text-custom-title dark:text-white">
        Lista de proyectos analiza.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-custom-title dark:text-white font-bold text-center">
            Nombre
          </TableHead>
          <TableHead className="text-custom-title dark:text-white font-bold text-center">
            Descripción
          </TableHead>
          <TableHead className="text-custom-title dark:text-white font-bold text-center">
            Estado
          </TableHead>
          <TableHead className="text-custom-title dark:text-white font-bold text-center">
            Cliente
          </TableHead>

          <TableHead className="text-custom-title dark:text-white font-bold text-center">
            Acciones
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {proyectos?.proyectos.map((proyecto: TypeProyectos) => (
          <TableRow key={proyecto.id}>
            <TableCell className="text-center">{proyecto.nombre}</TableCell>
            <TableCell className="text-center">
              {proyecto.descripcion}
            </TableCell>
            <TableCell className="text-center">{proyecto.estado}</TableCell>
            <TableCell className="text-center">{proyecto.cliente}</TableCell>

            <TableCell className="text-center">
              <div className="flex justify-around items-center gap-3 sm:gap-0">
                {proyecto.estado === "En Progreso" && (
                  <>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Trash2 className="text-custom-title dark:text-white cursor-pointer" />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-custom-title dark:text-white ">
                            ¿Estas seguro de eliminar este proyecto?
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-custom-title dark:text-white ">
                            Recuerda que una vez que elimines el proyecto, no
                            podrás recuperarlo.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteProyecto(proyecto.id)}
                          >
                            Continuar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog onOpenChange={setOpenEditDialog}>
                      <AlertDialogTrigger asChild>
                        <Pencil className="text-custom-title dark:text-white cursor-pointer" />
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
                  </>
                )}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <p
                      onClick={() => setDetailsProyecto(proyecto)}
                      className="text-custom-title hover:underline dark:text-white text-base cursor-pointer"
                    >
                      Detalles
                    </p>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="sm:max-w-3xl">
                    <div className="flex justify-end">
                      <AlertDialogCancel>X</AlertDialogCancel>
                    </div>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-custom-title dark:text-white">
                        Detalles del Proyecto
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-custom-title dark:text-white">
                        En esta seccion podras observar mas detalles del
                        proyecto.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div>
                      <div className="flex justify-center">
                        <h2 className="text-lg text-custom-title dark:text-white font-semibold">
                          {detailsProyecto?.nombre}
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        <div>
                          <div className="w-full">
                            <p className="text-center text-custom-title dark:text-white font-semibold">
                              Creador:
                            </p>
                            <p className="text-sm text-custom-title dark:text-white text-center">
                              {detailsProyecto?.creador.nombre}
                            </p>
                          </div>
                        </div>
                        <div>
                          <div className="w-full">
                            <p className="text-center text-custom-title dark:text-white font-semibold">
                              Responsable:
                            </p>
                            <p className="text-sm text-custom-title dark:text-white  text-center">
                              {detailsProyecto?.responsable.nombre}
                            </p>
                          </div>
                        </div>
                        <div>
                          <div className="w-full">
                            <p className="text-center text-custom-title dark:text-white font-semibold">
                              Colaboradores:
                            </p>
                            <p className="text-sm text-custom-title dark:text-white  text-center">
                              {detailsProyecto?.usuarios.length === 0 ? (
                                <>
                                  <p>No se encontraron colaboradores</p>
                                </>
                              ) : (
                                <div className="w-full">
                                  {detailsProyecto?.usuarios.map(
                                    (colaborador) => (
                                      <p
                                        key={colaborador.id}
                                        className="text-sm text-custom-title dark:text-white  text-center"
                                      >
                                        {colaborador.nombre}
                                      </p>
                                    )
                                  )}
                                </div>
                              )}
                            </p>
                          </div>
                        </div>
                        <div>
                          <div className="w-full">
                            <p className="text-center text-custom-title dark:text-white font-semibold">
                              Empresa:
                            </p>
                            <p className="text-sm text-custom-title dark:text-white  text-center">
                              {detailsProyecto?.empresa
                                ? detailsProyecto?.empresa.nombre
                                : "ND"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <AlertDialogFooter></AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableProyectosManager;
