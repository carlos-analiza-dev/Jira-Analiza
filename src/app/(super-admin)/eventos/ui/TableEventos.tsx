import removeEvento from "@/api/removeEvento";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
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
import { formatFecha } from "@/helpers/formatDate";
import { DataEventos } from "@/types/evento.type";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

interface Props {
  result: DataEventos[];
  check: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
}

const TableEventos = ({ result, check, setCheck }: Props) => {
  const user = useSelector((state: any) => state.auth);
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      const response = await removeEvento(id, user.token);
      setCheck(!check);
      toast({ title: "Evento eliminado exitosamente" });
      window.location.reload();
    } catch (error) {
      toast({
        title: "Ocurrio un error al eliminar el evento",
        variant: "destructive",
      });
    }
  };

  if (!result || result.length === 0) {
    return (
      <div className="mt-5">
        <p className="text-center font-bold text-custom-title text-2xl dark:text-white">
          No se encontraron eventos.
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableCaption className="font-bold">Listado de eventos</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Nombre
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Descripcion
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Estado
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Tipo de evento
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Fecha de inicio
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Fecha de finalizacion
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Acciones
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {result.map((evento) => (
          <TableRow key={evento.id}>
            <TableCell className="font-medium">{evento.nombre}</TableCell>
            <TableCell className="text-custom-title dark:text-white text-center">
              {evento.descripcion}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center">
              {evento.estado}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center">
              {evento.tipoEvento}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center">
              {formatFecha(evento.fechaInicio)}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center">
              {formatFecha(evento.fechaFin)}
            </TableCell>
            <TableCell className="text-center">
              <div className="flex justify-around gap-3 ">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">
                      <Trash2 size={15} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-custom-title dark:text-white">
                        ¿Estas seguro de eliminar este evento?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Una vez elimines el evento no podras revertirlo
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="text-custom-title dark:text-white">
                        Cancelar
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(evento.id)}
                        className="bg-custom-title text-white dark:bg-white dark:text-custom-title"
                      >
                        Continuar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button /* onClick={() => handleEdit(rol)} */ variant="outline">
                  <Pencil size={15} />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableEventos;
