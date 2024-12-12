import updateProyecto from "@/api/proyectos/updateProyecto";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { TypeProyectos } from "@/types/proyectos.type";

import { useSelector } from "react-redux";
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
import { Textarea } from "./ui/textarea";
import { useState } from "react";

interface Props {
  proyectos: TypeProyectos[] | [];
  setProyectosPendings: React.Dispatch<
    React.SetStateAction<TypeProyectos[] | []>
  >;
}
const TableProyectosPending = ({ proyectos, setProyectosPendings }: Props) => {
  const user = useSelector((state: any) => state.auth);
  const { toast } = useToast();
  const [justificacion, setJustificacion] = useState<string>("");

  const handleStatusProject = async (
    proyectoId: string,
    statusProject: string
  ) => {
    if (statusProject === "Rechazado" && justificacion.trim() === "") {
      toast({
        title: "Error",
        description:
          "La justificación es obligatoria para rechazar un proyecto.",
        variant: "destructive",
      });
      return;
    }

    const projectData = {
      statusProject,
      ...(statusProject === "Rechazado" && { justificacion }),
    };

    try {
      const response = await updateProyecto(
        proyectoId,
        projectData,
        user.token
      );

      setProyectosPendings((projects) =>
        projects.filter((proy) => proy.id !== proyectoId)
      );

      if (statusProject === "Aceptado") {
        toast({ title: "Proyecto aceptado con éxito" });
      } else if (statusProject === "Rechazado") {
        toast({
          title: "Proyecto rechazado con éxito",
          variant: "destructive",
        });
      }

      setJustificacion("");
    } catch (error) {
      toast({
        title: "Error al actualizar el proyecto",
        variant: "destructive",
      });
    }
  };

  if (!proyectos || proyectos.length === 0) {
    return (
      <div className="mt-5 text-center">
        <p className="text-red-600 text-lg font-bold">
          No se encontraron proyectos pendientes
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableCaption className="text-custom-title dark:text-white font-semibold text-center">
        Lista de proyectos pendientes.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-custom-title dark:text-white font-semibold text-center">
            Nombre Proyecto
          </TableHead>
          <TableHead className="text-custom-title dark:text-white font-semibold text-center">
            Creador
          </TableHead>
          <TableHead className="text-custom-title dark:text-white font-semibold text-center">
            Descripcion
          </TableHead>
          <TableHead className="text-custom-title dark:text-white font-semibold text-center">
            Acciones
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {proyectos?.map((proyecto) => (
          <TableRow key={proyecto.id}>
            <TableCell className="text-custom-title dark:text-white text-center font-normal">
              {proyecto.nombre}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center font-normal">
              {proyecto.creador.nombre}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center font-normal">
              {proyecto.descripcion}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center font-normal">
              <div className="flex justify-around gap-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <p className="dark:text-white text-custom-title font-semibold cursor-pointer hover:underline">
                      Aceptar
                    </p>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-custom-title dark:text-white font-bold">
                        ¿Estas seguro de aceptar este proyecto?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-custom-title dark:text-white font-medium">
                        Recuerda que si aceptas este proyecto, estaras bajo la
                        responsabilidad del mismo.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-custom-title dark:bg-white text-white dark:text-custom-title font-semibold"
                        onClick={() =>
                          handleStatusProject(proyecto.id, "Aceptado")
                        }
                      >
                        Continuar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <p className="dark:text-white text-custom-title font-semibold cursor-pointer hover:underline">
                      Rechazar
                    </p>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-custom-title dark:text-white font-bold">
                        ¿Estas seguro de realizar esta accion?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-custom-title dark:text-white font-normal">
                        Recuerda, una vez realices esta accion, no se podra
                        revertir.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="mt-4 mb-4 ">
                      <label className="text-custom-title dark:text-white font-semibold">
                        Justificacion
                      </label>
                      <Textarea
                        value={justificacion}
                        onChange={(e) => setJustificacion(e.target.value)}
                        placeholder="Escribe una justficacion de porque rechazas el proyecto."
                      />
                    </div>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-custom-title dark:bg-white text-white dark:text-custom-title font-semibold"
                        onClick={() =>
                          handleStatusProject(proyecto.id, "Rechazado")
                        }
                      >
                        Aceptar
                      </AlertDialogAction>
                    </AlertDialogFooter>
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

export default TableProyectosPending;
