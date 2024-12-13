import useAllEventosFinalizados from "@/api/eventos/getAllEventosFinalizados";
import { DataEventos } from "@/types/evento.type";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SkeletonTable from "./SkeletonTable";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";

interface Props {
  id: string;
}

const EventosFinalizadosByUser = ({ id }: Props) => {
  const user = useSelector((state: any) => state.auth);
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [check, setCheck] = useState<boolean>(true);
  const { result, error, loading } = useAllEventosFinalizados(
    id,
    user.token,
    check,
    limit,
    offset
  );
  const [finalizados, setFinalizados] = useState<DataEventos[] | []>([]);

  useEffect(() => {
    if (result && result.data) {
      setFinalizados(result.data);
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
          No se encontraron eventos finalzados para este usuario.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Table>
        <TableCaption className="text-custom-title dark:text-white">
          Lista de eventos finalizados.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-custom-title dark:text-white font-bold text-center">
              Nombre del Evento
            </TableHead>
            <TableHead className="text-custom-title dark:text-white font-bold text-center">
              Descripcion
            </TableHead>
            <TableHead className="text-custom-title dark:text-white font-bold text-center">
              Creador
            </TableHead>
            <TableHead className="text-custom-title dark:text-white font-bold text-center">
              Responsable
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {finalizados.map((evento: DataEventos) => (
            <TableRow key={evento.id}>
              <TableCell className="text-custom-title dark:text-white text-center">
                {evento.nombre}
              </TableCell>
              <TableCell className="text-custom-title dark:text-white text-center">
                {evento.descripcion}
              </TableCell>
              <TableCell className="text-custom-title dark:text-white text-center">
                {evento.usuarioCreador.nombre}
              </TableCell>
              <TableCell className="text-custom-title dark:text-white text-center">
                {evento.responsable.nombre}
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

export default EventosFinalizadosByUser;
