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
import React, { useState } from "react";
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
interface Props {
  eventos: [] | DataEventos[];
  setEventosPendings: React.Dispatch<React.SetStateAction<[] | DataEventos[]>>;
}
const TableEventosPending = ({ eventos, setEventosPendings }: Props) => {
  const user = useSelector((state: any) => state.auth);
  const { toast } = useToast();
  const [justificacion, setJustificacion] = useState<string>("");

  const handleStatusEvento = async (eventoId: string, statusEvento: string) => {
    if (statusEvento === "Rechazado" && justificacion.trim() === "") {
      toast({
        title: "Error",
        description: "La justificación es obligatoria para rechazar un evento.",
        variant: "destructive",
      });
      return;
    }

    const eventoData = {
      statusEvento,
      ...(statusEvento === "Rechazado" && { justificacion }),
    };

    try {
      const response = await updateEvento(eventoId, eventoData, user.token);

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
      setJustificacion("");
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
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <p className="dark:text-white text-custom-title font-semibold cursor-pointer hover:underline">
                      Aceptar
                    </p>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-custom-title dark:text-white font-bold">
                        ¿Estas seguro de aceptar este evento?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-custom-title dark:text-white font-medium">
                        Recuerda que si aceptas este evento, estaras bajo la
                        responsabilidad del mismo.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-custom-title dark:bg-white text-white dark:text-custom-title font-semibold"
                        onClick={() =>
                          handleStatusEvento(evento.id, "Aceptado")
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
                        placeholder="Escribe una justficacion de porque rechazas el evento."
                      />
                    </div>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-custom-title dark:bg-white text-white dark:text-custom-title font-semibold"
                        onClick={() =>
                          handleStatusEvento(evento.id, "Rechazado")
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

export default TableEventosPending;
