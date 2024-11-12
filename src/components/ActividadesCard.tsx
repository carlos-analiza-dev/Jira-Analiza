import { ActividadesType } from "@/types/actividades.type";
import { useDraggable } from "@dnd-kit/core";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useToast } from "./ui/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
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
import ActividadesForm from "./ActividadesForm";
import deleteActividad from "@/api/actividades/deleteActividad";

interface Props {
  actividad: ActividadesType;
  check: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
  setActividadesStatus: React.Dispatch<
    React.SetStateAction<ActividadesType[] | []>
  >;
}

const ActividadesCard = ({
  actividad,
  check,
  setCheck,
  setActividadesStatus,
}: Props) => {
  const [actividadesId, setActividadesId] = useState("");
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: actividad.id,
  });
  const user = useSelector((state: any) => state.auth);
  const params = useParams();
  const eventoId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { toast } = useToast();

  const [actividadUpdate, setActividadUpdate] =
    useState<ActividadesType | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleActividad = (actividad: ActividadesType) => {
    setActividadUpdate(actividad);
    setIsEdit(true);
  };

  const handleActividadId = (actividadId: string) => {
    setActividadesId(actividadId);
  };

  const deleteActividadSubmit = async () => {
    try {
      const response = await deleteActividad(actividadesId, user.token);
      setActividadesStatus((prevActividades) =>
        prevActividades.filter(
          (actividad: ActividadesType) => actividad.id !== actividadesId
        )
      );
      setCheck(!check);
      toast({ title: "Actividad elimninada exitosamente" });
    } catch (error) {
      toast({
        title: "Ocurrio un error al eliminar la actividad",
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
            {actividad.titulo}
          </p>
          <p className="text-custom-title text-base font-light dark:text-white ">
            <span className="font-semibold">Descripción:</span>{" "}
            {actividad.descripcion}
          </p>
          <p className="text-custom-title text-sm font-light dark:text-white mt-1">
            <span className="font-semibold">Responsable:</span>{" "}
            {actividad.usuarioAsignado.nombre}
          </p>
          <p className="text-custom-title text-sm font-light dark:text-white mt-1">
            <span className="font-semibold">Actualizado:</span>{" "}
            {actividad.actualizadoPor ? actividad.actualizadoPor.nombre : "N/A"}
          </p>
        </div>
        {user.id === actividad.creador.id && (
          <div className="flex items-center cursor-pointer">
            <Popover>
              <PopoverTrigger asChild>
                <EllipsisVertical />
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <AlertDialogTrigger asChild>
                    <div
                      onClick={() => handleActividad(actividad)}
                      className="flex justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 text-custom-title dark:text-white p-2"
                    >
                      <p>Editar actividad</p>
                      <Pencil />
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        {isEdit ? "Editar Actividad" : "Crear Actividad"}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        <ActividadesForm
                          eventoId={eventoId}
                          check={check}
                          setCheck={setCheck}
                          isEdit={isEdit}
                          actividadUpdate={actividadUpdate}
                        />
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                  </AlertDialogContent>
                </AlertDialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div
                      onClick={() => handleActividadId(actividad.id)}
                      className="flex justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 text-red-500 dark:text-red-500 p-2"
                    >
                      <p>Eliminar actividad</p>
                      <Trash2 />
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-custom-title dark:text-white font-bold">
                        ¿Deseas eliminar esta actividad?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-custom-title dark:text-white">
                        Debes estar seguro antes de realizar esta accion.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={deleteActividadSubmit}
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

export default ActividadesCard;
