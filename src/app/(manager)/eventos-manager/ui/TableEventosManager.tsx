import removeEvento from "@/api/eventos/removeEvento";
import FormEventos from "@/components/FormEventos";
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
import { DataEventos, ResponseEvento } from "@/types/evento.type";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Props {
  result: ResponseEvento;
  check?: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
}

const TableEventosManager = ({ result, setCheck, check }: Props) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const user = useSelector((state: any) => state.auth);
  const { toast } = useToast();
  const [eventos, setEventos] = useState<DataEventos[] | []>([]);
  const [isEdit, setIsEdit] = useState<any>(null);

  useEffect(() => {
    setEventos(result.data);
  }, [result]);

  const handleDeleteEvento = async (eventoId: string) => {
    try {
      const response = await removeEvento(eventoId, user.token);

      setEventos((prevEvento) =>
        prevEvento.filter((event) => event.id !== eventoId)
      );
      toast({ title: "Evento eliminado exitosamente." });
    } catch (error) {
      toast({ title: "Ocurrio un error al momento de eliminar el evento." });
    }
  };

  if (!eventos || eventos.length === 0) {
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
            No se encontraron eventos.
          </p>
        </div>
      </div>
    );
  }

  const handleEdit = (evento: DataEventos) => {
    setIsEdit(evento);
  };

  const handleCloseEdit = () => {
    setIsEdit(null);
  };

  return (
    <Table className="mt-5 mb-5 px-10">
      <TableCaption className="text-custom-title dark:text-white">
        Lista de eventos analiza.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-custom-title dark:text-white font-bold text-center">
            Nombre Evento
          </TableHead>
          <TableHead className="text-custom-title dark:text-white font-bold text-center">
            Descripción
          </TableHead>
          <TableHead className="text-custom-title dark:text-white font-bold text-center">
            Estado
          </TableHead>
          <TableHead className="text-custom-title dark:text-white font-bold text-center">
            Tipo
          </TableHead>

          <TableHead className="text-custom-title dark:text-white font-bold text-center">
            Acciones
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {eventos.map((evento: DataEventos) => (
          <TableRow key={evento.id}>
            <TableCell className="text-center">{evento.nombre}</TableCell>
            <TableCell className="text-center">{evento.descripcion}</TableCell>
            <TableCell className="text-center">{evento.estado}</TableCell>
            <TableCell className="text-center">{evento.tipoEvento}</TableCell>

            <TableCell className="text-center">
              <div className="flex justify-around items-center gap-3 sm:gap-0">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Trash2 className="text-custom-title dark:text-white cursor-pointer" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-custom-title dark:text-white ">
                        ¿Estas seguro de eliminar este evento?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-custom-title dark:text-white ">
                        Recuerda que una vez que elimines el evento, no podrás
                        recuperarlo.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteEvento(evento.id)}
                      >
                        Continuar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Pencil
                      onClick={() => handleEdit(evento)}
                      className="text-custom-title dark:text-white  cursor-pointer"
                    />
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-full max-w-2xl">
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
                    <div className="w-full flex items-center justify-center">
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
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableEventosManager;
