import { TareasData } from "@/types/tareas.type";
import { EllipsisVertical, Eye, Pencil, Trash2, Check } from "lucide-react";
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
import { useEffect, useState } from "react";
import TareasForm from "./TareasForm";
import { useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import deleteTarea from "@/api/tareas/deleteTarea";
import { useSelector } from "react-redux";
import { useDraggable } from "@dnd-kit/core";
import { TypeProyectos } from "@/types/proyectos.type";
import useTareaId from "@/api/tareas/getTareaId";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useGetComentariosTareaId from "@/api/comentariosTasks/getComentariosTaskId";
import { ComentariosType } from "@/types/comentarios/comentarios.type";
import createComentario from "@/api/comentariosTasks/createComentario";
import { ComentariosPost } from "@/types/comentarios/comentarios.post.type";
import { useForm } from "react-hook-form";
import DetallesComentario from "./DetallesComentario";
import Comentarios from "./Comentarios";

interface Props {
  tarea: TareasData;
  check: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
  proyectos: TypeProyectos;
}
const TareasCard = ({ tarea, check, setCheck, proyectos }: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: tarea.id,
  });
  const user = useSelector((state: any) => state.auth);
  const params = useParams();
  const [check2, setCheck2] = useState(false);
  const proyectoId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tareaId, setTareaId] = useState("");
  const { toast } = useToast();
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { result, error } = useTareaId(tareaId, user.token);
  const {
    result: resComentarios,
    error: errorComentarios,
    loading,
  } = useGetComentariosTareaId(tareaId, user.token, check2);
  const [tareaUpdate, setTareaUpdate] = useState<TareasData | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [task, setTask] = useState<TareasData | null>(null);
  const [comentarios, setComentarios] = useState<ComentariosType[]>([]);
  const [comentarioTexto, setComentarioTexto] = useState<string>("");
  const { handleSubmit } = useForm<ComentariosPost>();

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

  useEffect(() => {
    if (resComentarios) {
      setComentarios(resComentarios);
    }
  }, [resComentarios]);

  useEffect(() => {
    if (result) {
      setTask(result);
    }
  }, [result]);

  const onSubmit = async () => {
    if (!comentarioTexto.trim()) {
      toast({
        title: "El comentario no puede estar vacío",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const nuevoComentario = await createComentario(
        { contenido: comentarioTexto, userId: user.id },
        tareaId,
        user.token
      );
      setCheck2(!check2);
      setComentarios((prevComentarios) => [
        ...prevComentarios,
        nuevoComentario as ComentariosType,
      ]);

      toast({ title: "Comentario creado exitosamente" });

      setComentarioTexto("");
      setIsFocused(false);
    } catch (error) {
      toast({
        title: "Ocurrió un error al agregar el comentario",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
            <span className="font-semibold">Descripción:</span>{" "}
            {tarea.descripcion}
          </p>
          <p className="text-custom-title text-base font-bold dark:text-white ">
            Prioridad:{" "}
            <span
              className={`${tarea.prioridad === "Baja" ? "text-green-600" : tarea.prioridad === "Media" ? "text-sky-600" : tarea.prioridad === "Alta" ? "text-amber-600" : "text-red-500"} font-semibold`}
            >
              {tarea.prioridad}
            </span>
          </p>
          <p className="text-custom-title text-sm font-light dark:text-white mt-1">
            <span className="font-semibold">Responsable:</span>{" "}
            {tarea && tarea.usuarioAsignado
              ? tarea.usuarioAsignado.nombre
              : "ND"}
          </p>

          <p className="text-custom-title text-base font-light dark:text-white mt-2">
            <span className="font-semibold">
              Tiempo para realizar la tarea:
            </span>{" "}
            {tarea.fechaInicio && tarea.fechaFin
              ? (() => {
                  const fechaActual = new Date();
                  const fechaFin = new Date(tarea.fechaFin);
                  const tiempoRestante = Math.ceil(
                    (fechaFin.getTime() - fechaActual.getTime()) /
                      (1000 * 60 * 60 * 24)
                  );

                  const tiempoTotal = Math.ceil(
                    (fechaFin.getTime() -
                      new Date(tarea.fechaInicio).getTime()) /
                      (1000 * 60 * 60 * 24)
                  );

                  if (tiempoRestante <= 0) {
                    return (
                      <span className="text-red-500 font-bold">
                        Fecha límite excedida
                      </span>
                    );
                  }

                  return (
                    <span
                      className={
                        tiempoRestante <= 1 ? "text-red-500 font-bold" : ""
                      }
                    >
                      {tiempoRestante <= tiempoTotal
                        ? `${tiempoRestante} día${tiempoRestante > 1 ? "s" : ""}`
                        : "Fecha límite excedida"}
                    </span>
                  );
                })()
              : "Fechas incompletas"}
          </p>
        </div>
        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <p className="cursor-pointer hover:underline text-base text-custom-title dark:text-white font-semibold">
                <Eye onClick={() => handleTareaId(tarea.id)} />
              </p>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-screen-xl w-full h-[60vh] sm:h-[70vh] md:h-[80vh] p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-y-auto">
              <div className="flex justify-end">
                <AlertDialogCancel>X</AlertDialogCancel>
              </div>
              <AlertDialogHeader className="max-h-screen">
                <AlertDialogTitle className="text-custom-title dark:text-white font-semibold text-lg text-center">
                  Detalles de la tarea - {task?.titulo}
                </AlertDialogTitle>
                <AlertDialogDescription className="h-full">
                  <div className="flex flex-col sm:flex-row w-full gap-4 mt-4 h-full">
                    <div className="p-4 dark:bg-gray-700 rounded-md w-full sm:w-3/5">
                      <div className="flex gap-3">
                        <Avatar className="w-10 h-10">
                          {" "}
                          <AvatarFallback className="bg-custom-second text-white font-bold uppercase">
                            {user?.nombre
                              ? `${user.nombre[0]}${user.nombre[1]}`
                              : "??"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="w-full">
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <Input
                              className="w-full dark:bg-gray-800 dark:text-white"
                              placeholder="Añadir un comentario..."
                              value={comentarioTexto}
                              onChange={(e) =>
                                setComentarioTexto(e.target.value)
                              }
                              onFocus={() => setIsFocused(true)}
                              onBlur={() => {
                                if (
                                  !isSubmitting &&
                                  comentarioTexto.trim() === ""
                                ) {
                                  setIsFocused(false);
                                }
                              }}
                            />

                            {isFocused && (
                              <div className="mt-2 flex justify-start gap-3">
                                <Button
                                  className="bg-custom-title text-white font-bold dark:bg-white dark:text-custom-title"
                                  type="submit"
                                  disabled={isSubmitting}
                                >
                                  {isSubmitting ? "Guardando..." : "Guardar"}
                                </Button>
                                <Button
                                  variant="outline"
                                  className="dark:bg-custom-second dark:text-white font-bold"
                                  onClick={() => {
                                    setComentarioTexto("");
                                    setIsFocused(false);
                                  }}
                                >
                                  Cancelar
                                </Button>
                              </div>
                            )}
                          </form>
                        </div>
                      </div>
                      <Comentarios
                        comentarios={comentarios}
                        setComentarios={setComentarios}
                      />
                    </div>
                    <DetallesComentario task={task} />
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="flex items-center cursor-pointer">
          {(proyectos?.creador?.id === user.id ||
            proyectos?.responsable?.id === user.id) && (
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
                        Debes estar seguro antes de realizar esta acción.
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
          )}
        </div>
      </div>
    </div>
  );
};

export default TareasCard;
