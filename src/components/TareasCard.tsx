import { TareasData } from "@/types/tareas.type";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { useState } from "react";
import TareasForm from "./TareasForm";
import { useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import deleteTarea from "@/api/deleteTarea";
import { useSelector } from "react-redux";
import { useDraggable } from "@dnd-kit/core";
import { formatFecha } from "@/helpers/formatDate";

interface Props {
  tarea: TareasData;
  check: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
}
const TareasCard = ({ tarea, check, setCheck }: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: tarea.id,
  });
  const user = useSelector((state: any) => state.auth);
  const params = useParams();
  const proyectoId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tareaId, setTareaId] = useState("");
  const { toast } = useToast();

  const [tareaUpdate, setTareaUpdate] = useState<TareasData | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleTarea = (tarea: TareasData) => {
    setTareaUpdate(tarea);
    setIsEdit(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setIsEdit(false);
    setTareaUpdate(null);
  };

  const handleTareaId = (tareaId: string) => {
    setTareaId(tareaId);
  };

  const deleteTask = async () => {
    try {
      const response = await deleteTarea(tareaId, user.token);
      toast({ title: "Tarea elimninada exitosamente" });
      setCheck(!check);
    } catch (error) {
      toast({
        title: "Ocurrio un error al eliminar la tarea",
        variant: "destructive",
      });
    }
  };

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        padding: "1.25rem",
        backgroundColor: document.documentElement.classList.contains("dark")
          ? "#1f2937"
          : "#f8fafc",
        color: document.documentElement.classList.contains("dark")
          ? "#f8fafc"
          : "#1f2937",
        width: "400px",
        display: "block",
        borderWidth: "1px",
        borderColor: document.documentElement.classList.contains("dark")
          ? "rgb(75 85 99 / var(--tw-border-opacity))"
          : "rgb(203 213 225 / var(--tw-border-opacity))",
      }
    : undefined;

  return (
    <div className="p-2 bg-gray-50 dark:bg-gray-900 mt-2 shadow-md block w-full">
      <div className="flex justify-between gap-3">
        <div
          {...listeners}
          {...attributes}
          ref={setNodeRef}
          style={style}
          className="text-start w-full"
        >
          <p className="text-custom-title text-lg font-bold dark:text-white">
            {tarea.titulo}
          </p>
          <p className="text-custom-title text-base font-light dark:text-white ">
            <span className="font-bold">Descripcion:</span> {tarea.descripcion}
          </p>
          <p className="text-custom-title text-sm font-light dark:text-white mt-1">
            <span className="font-bold">Responsable:</span>{" "}
            {tarea && tarea.usuarioAsignado
              ? tarea.usuarioAsignado.nombre
              : "ND"}
          </p>
          <p className="text-custom-title text-sm font-light dark:text-white mt-1">
            Actualizado por:{" "}
            {tarea.actualizadoPor ? tarea.actualizadoPor.nombre : "N/A"}
          </p>
          <p className="text-custom-title text-sm font-light dark:text-white mt-1">
            Ultima actualizacion: {formatFecha(tarea.updatedAt)}
          </p>
        </div>
        {user.id === tarea.creador.id && (
          <div className="flex items-center cursor-pointer">
            <Popover>
              <PopoverTrigger asChild>
                <EllipsisVertical />
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <AlertDialogTrigger asChild>
                    <div
                      onClick={() => handleTarea(tarea)}
                      className="flex justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 text-custom-title dark:text-white p-2"
                    >
                      <p>Editar tarea</p>
                      <Pencil />
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        {isEdit ? "Editar Tarea" : "Crear Tarea"}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        <TareasForm
                          isEdit={isEdit}
                          proyectoId={proyectoId}
                          tareaUpdate={tareaUpdate}
                          check={check}
                          setCheck={setCheck}
                          onClose={handleClose}
                        />
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                  </AlertDialogContent>
                </AlertDialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div
                      onClick={() => handleTareaId(tarea.id)}
                      className="flex justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 text-red-500 dark:text-red-500 p-2"
                    >
                      <p>Eliminar tarea</p>
                      <Trash2 />
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-custom-title dark:text-white font-bold">
                        ¿Deseas eliminar esta tarea?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-custom-title dark:text-white">
                        Debes estar seguro antes de realizar esta accion.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={deleteTask}
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
        )}
      </div>
    </div>
  );
};

export default TareasCard;
