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

interface Props {
  proyectos: TypeProyectos[] | [];
  setProyectosPendings: React.Dispatch<
    React.SetStateAction<TypeProyectos[] | []>
  >;
}
const TableProyectosPending = ({ proyectos, setProyectosPendings }: Props) => {
  const user = useSelector((state: any) => state.auth);
  const { toast } = useToast();

  const handleStatusProject = async (
    proyectoId: string,
    statusProject: string
  ) => {
    const projectData = {
      statusProject,
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
                <p
                  className="dark:text-white text-custom-title font-semibold cursor-pointer hover:underline"
                  onClick={() => handleStatusProject(proyecto.id, "Aceptado")}
                >
                  Aceptar
                </p>
                <p
                  className="dark:text-white text-custom-title font-semibold cursor-pointer hover:underline"
                  onClick={() => handleStatusProject(proyecto.id, "Rechazado")}
                >
                  Rechazar
                </p>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableProyectosPending;
