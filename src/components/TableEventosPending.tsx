import updateEvento from "@/api/eventos/updateEvento";
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
import { DataEventos } from "@/types/evento.type";
import React from "react";
import { useSelector } from "react-redux";
interface Props {
  eventos: [] | DataEventos[];
  setEventosPendings: React.Dispatch<React.SetStateAction<[] | DataEventos[]>>;
}
const TableEventosPending = ({ eventos, setEventosPendings }: Props) => {
  const user = useSelector((state: any) => state.auth);
  const { toast } = useToast();

  const handleStatusEvento = async (eventoId: string, statusEvento: string) => {
    const projectData = {
      statusEvento,
    };

    try {
      const response = await updateEvento(eventoId, projectData, user.token);

      setEventosPendings((events) =>
        events.filter((event) => event.id !== eventoId)
      );
      if (statusEvento === "Aceptado") {
        toast({ title: "Evento aceptado con éxito" });
      } else if (statusEvento === "Rechazado") {
        toast({
          title: "Evento rechazado con éxito",
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

  if (!eventos || eventos.length === 0) {
    return (
      <div className="mt-5 text-center">
        <p className="text-red-600 text-lg font-bold">
          No se encontraron Eventos pendientes
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableCaption className="text-custom-title dark:text-white font-semibold text-center">
        Lista de eventos pendientes.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-custom-title dark:text-white font-semibold text-center">
            Nombre Evento
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
        {eventos?.map((evento) => (
          <TableRow key={evento.id}>
            <TableCell className="text-custom-title dark:text-white text-center font-normal">
              {evento.nombre}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center font-normal">
              {evento.usuarioCreador.nombre}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center font-normal">
              {evento.descripcion}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center font-normal">
              <div className="flex justify-around gap-2">
                <p
                  className="dark:text-white text-custom-title font-semibold cursor-pointer hover:underline"
                  onClick={() => handleStatusEvento(evento.id, "Aceptado")}
                >
                  Aceptar
                </p>
                <p
                  className="dark:text-white text-custom-title font-semibold cursor-pointer hover:underline"
                  onClick={() => handleStatusEvento(evento.id, "Rechazado")}
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

export default TableEventosPending;
