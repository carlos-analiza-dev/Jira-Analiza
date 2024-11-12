import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useToast } from "./ui/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { EllipsisVertical, Trash2 } from "lucide-react";
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
import { UserType } from "@/types/user.type";
import deleteColaboradorByEvento from "@/api/eventos/deleteColaboradorByEvento";
import { useEffect, useState } from "react";

type ColaboradorType = {
  result: UserType[];
};

const ColaboradoresEventos = ({ result }: ColaboradorType) => {
  const user = useSelector((state: any) => state.auth);
  const params = useParams();
  const eventoId = Array.isArray(params.id) ? params.id[0] : params.id;
  const { toast } = useToast();
  const [colaboradores, setColaboradores] = useState<any[]>([]);

  useEffect(() => {
    if (result) {
      setColaboradores(result);
    }
  }, [result]);

  const deleteColaborador = async (userId: string) => {
    try {
      const response = await deleteColaboradorByEvento(
        eventoId,
        userId,
        user.token
      );

      setColaboradores((prevColaboradores) =>
        prevColaboradores.filter(
          (colaborador: UserType) => colaborador.id !== userId
        )
      );

      toast({ title: "Colaborador eliminado exitosamente" });
    } catch (error) {
      toast({
        title: "Ocurrio un error al eliminar el colaborador.",
        variant: "destructive",
      });
    }
  };

  if (!colaboradores || colaboradores.length === 0) {
    return (
      <div className="flex justify-center items-center mx-auto mt-10 p-7 sm:p-0">
        <p className="text-sm sm:text-3xl font-bold text-custom-title dark:text-white">
          No se encontraron colaboradores disponibles
        </p>
      </div>
    );
  }

  return (
    <div className="mt-5 w-full grid grid-cols-1 sm:grid-cols-2 gap-5 overflow-y-auto max-h-96">
      {colaboradores.map((colaborador) => (
        <div
          key={colaborador.id}
          className="flex justify-between bg-gray-50 dark:bg-gray-900 rounded-md shadow p-3 mt-3 items-center"
        >
          <div>
            <p className="text-custom-title dark:text-white text-lg font-bold">
              {colaborador.nombre}
            </p>
            <p className="text-custom-title dark:text-white text-base">
              {colaborador.correo}
            </p>
          </div>
          <div className="cursor-pointer">
            <Popover>
              <PopoverTrigger asChild>
                <EllipsisVertical />
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div className="flex justify-between hover:bg-gray-50 cursor-pointer p-2 rounded-sm dark:hover:bg-gray-900">
                      <p className="text-red-500">Eliminar colaborador</p>
                      <Trash2 className="text-red-500" />
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-custom-title dark:text-white font-bold">
                        ¿Estás seguro de eliminar este colaborador del evento?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-custom-title dark:text-white">
                        Debes estar completamente seguro antes de realizar esta
                        acción.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteColaborador(colaborador.id)}
                        className="bg-custom-title text-white dark:bg-white dark:text-custom-title"
                      >
                        Continuar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColaboradoresEventos;
