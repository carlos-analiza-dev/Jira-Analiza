import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import SkeletonTable from "./SkeletonTable";
import useAllProjectsRechazados from "@/api/proyectos/getAllProjectsRechazados";
import { ProyectosRechazado } from "@/types/proyectos-rechazados/proyectos-rechazados.type";
import { formatFecha } from "@/helpers/formatDate";
import { ChartSpline } from "lucide-react";

interface Props {
  id: string;
}

const ProyectosRechazadosByUser = ({ id }: Props) => {
  const user = useSelector((state: any) => state.auth);
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { result, error, loading } = useAllProjectsRechazados(
    id,
    user.token,

    limit,
    offset
  );
  const [finalizados, setFinalizados] = useState<ProyectosRechazado[] | []>([]);

  useEffect(() => {
    if (result && result.proyectosRechazados) {
      setFinalizados(result.proyectosRechazados);
    }
  }, [result]);

  useEffect(() => {
    if (result) {
      setTotalPages(Math.ceil(result.total / limit));
    }
  }, [result, limit]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setOffset((page - 1) * limit);
  };

  if (loading) {
    return <SkeletonTable />;
  }

  if (!finalizados || finalizados.length === 0) {
    return (
      <div className="mt-5 flex justify-center px-4">
        <p className="text-custom-title dark:text-white font-bold text-xl">
          No se encontraron proyectos rechazados para este usuario.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Table>
        <TableCaption className="text-custom-title dark:text-white">
          Lista de proyectos finalizados.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-custom-title dark:text-white font-bold text-center">
              Nombre del Proyecto
            </TableHead>
            <TableHead className="text-custom-title dark:text-white font-bold text-center">
              Descripcion
            </TableHead>
            <TableHead className="text-custom-title dark:text-white font-bold text-center">
              Rechazado
            </TableHead>
            <TableHead className="text-custom-title dark:text-white font-bold text-center">
              Fecha de rechazo
            </TableHead>
            <TableHead className="text-custom-title dark:text-white font-bold text-center">
              Motivo
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {finalizados.map((proyecto: ProyectosRechazado) => (
            <TableRow key={proyecto.id}>
              <TableCell className="text-custom-title dark:text-white text-center">
                {proyecto.proyecto.nombre}
              </TableCell>
              <TableCell className="text-custom-title dark:text-white text-center">
                {proyecto.proyecto.descripcion}
              </TableCell>
              <TableCell className="text-custom-title dark:text-white text-center">
                {proyecto.usuario.nombre}
              </TableCell>
              <TableCell className="text-custom-title dark:text-white text-center">
                {formatFecha(proyecto.fechaRechazo)}
              </TableCell>
              <TableCell className="text-custom-title dark:text-white text-center">
                {proyecto.motivoRechazo}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between mt-5">
        <Button
          className="bg-custom-title text-white dark:bg-white dark:text-custom-title font-bold"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Anterior
        </Button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <Button
          className="bg-custom-title text-white dark:bg-white dark:text-custom-title font-bold"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default ProyectosRechazadosByUser;
