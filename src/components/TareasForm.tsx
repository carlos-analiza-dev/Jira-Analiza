import createTarea from "@/api/tareas/createTarea";
import updateTarea from "@/api/tareas/updateTarea";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { PostTarea } from "@/types/postTareas.type";
import { TareasData } from "@/types/tareas.type";
import { UserType } from "@/types/user.type";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import useColaboradoresByProjectId from "@/api/proyectos/getColaboradoresByProjectId";
import useTareasProyectosId from "@/api/tareas/getTareasProyectoId";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarDays } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Props {
  proyectoId: string;
  check: boolean;
  tareaUpdate?: TareasData | null;
  isEdit?: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}

const TareasForm = ({
  proyectoId,
  check,
  setCheck,
  onClose,
  tareaUpdate,
  isEdit,
}: Props) => {
  const user = useSelector((state: any) => state.auth);
  const [mostrar, setMostrar] = useState(false);
  const [selectedPrioridad, setSelectedPrioridad] = useState(
    tareaUpdate?.prioridad
  );
  const [dependencia, setDependencia] = useState<string>("no");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    tareaUpdate?.fechaInicio ? new Date(tareaUpdate.fechaInicio) : undefined
  );
  const [selectedDataFinish, setSelectedDataFinish] = useState<
    Date | undefined
  >(tareaUpdate?.fechaFin ? new Date(tareaUpdate.fechaFin) : undefined);
  const {
    result: resultTareas,
    loading: resultLoading,
    error: resultError,
  } = useTareasProyectosId(proyectoId, user.token, check);

  const { toast } = useToast();
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<PostTarea>({
    defaultValues: {
      titulo: tareaUpdate?.titulo,
      descripcion: tareaUpdate?.descripcion,
      fechaFin: tareaUpdate?.fechaFin,
      fechaInicio: tareaUpdate?.fechaInicio,
      prioridad: tareaUpdate?.prioridad,
    },
  });

  const { result: usersByProjects } = useColaboradoresByProjectId(
    proyectoId,
    user.token
  );

  const [tareaDependencia, setTareaDependencia] = useState<TareasData[]>([]);
  const [tareaSeleccionada, setTareaSeleccionada] = useState("");
  const [usuariosSeleccionados, setUsuariosSeleccionados] = useState<
    UserType[]
  >([]);
  const [usuarioAsignado, setUsuarioAsignado] = useState("");

  useEffect(() => {
    if (resultTareas) {
      setTareaDependencia(resultTareas);
    }
  }, [resultTareas, user.token]);

  useEffect(() => {
    if (usersByProjects && usersByProjects) {
      setUsuariosSeleccionados(usersByProjects);
    } else {
      setUsuariosSeleccionados([]);
    }
  }, [user.token, usersByProjects]);

  useEffect(() => {
    reset({
      titulo: tareaUpdate?.titulo,
      descripcion: tareaUpdate?.descripcion,
      fechaFin: tareaUpdate?.fechaFin,
      fechaInicio: tareaUpdate?.fechaInicio,
      prioridad: tareaUpdate?.prioridad || "Baja",
    });
    setSelectedPrioridad(tareaUpdate?.prioridad || "Baja");
    setValue("proyectoId", proyectoId);
  }, [tareaUpdate, proyectoId, setValue]);

  const onSubmit = async (data: PostTarea) => {
    const { titulo, descripcion, fechaFin, fechaInicio, prioridad } = data;

    try {
      if (isEdit && tareaUpdate?.id) {
        const response = await updateTarea(
          tareaUpdate.id,
          { titulo, descripcion, fechaFin, fechaInicio, prioridad },
          user.token
        );

        toast({ title: "Tarea actualizada exitosamente" });
      } else {
        if (!usuarioAsignado) {
          toast({
            title: "Debe asignarse un responsable de esta tarea",
            variant: "destructive",
          });
          return;
        }
        await createTarea(
          {
            ...data,
            proyectoId,
            prioridad,
            usuarioAsignado,
            tareaDependenciaId: tareaSeleccionada,
          },
          user.token
        );

        toast({ title: "Tarea creada exitosamente" });
      }
      setCheck(!check);
      onClose();
      reset();
    } catch (error: any) {
      toast({
        title: error.response.data
          ? error.response.data.message
          : "Ocurrió un error al momento de procesar la tarea",
        variant: "destructive",
      });
    }
  };

  const handleUsuarioAsignado = (value: string) => {
    setUsuarioAsignado(value);
  };

  const handleTareaAsignada = (value: string) => {
    setTareaSeleccionada(value);
  };

  const handlePrioridadChange = (value: string) => {
    setSelectedPrioridad(value);
    setValue("prioridad", value);
  };

  const handleSelectStartDate = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setValue("fechaInicio", date);
    }
  };

  const handleSelectEndDate = (date: Date | undefined) => {
    setSelectedDataFinish(date);
    if (date) {
      setValue("fechaFin", date);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-100 dark:bg-gray-900 p-3"
    >
      <input type="hidden" {...register("proyectoId")} />

      <div className="mt-3">
        <label className="text-custom-title dark:text-white font-bold">
          Nombre de la tarea
        </label>
        <Input
          {...register("titulo", {
            required: "El nombre de la tarea es obligatorio",
            pattern: {
              value: /^[a-zA-Z\s]+$/,
              message: "El formato de nombre no es aceptado",
            },
          })}
          placeholder="Nombre completo"
          className="mt-2 dark:text-white dark:bg-gray-800"
        />
        {errors.titulo && (
          <span className="mt-1 text-red-500">{errors.titulo.message}</span>
        )}
      </div>
      <div className="mt-3">
        <label className="text-custom-title dark:text-white font-bold">
          Descripción de la tarea
        </label>
        <Input
          {...register("descripcion", {
            required: "La descripción de la tarea es obligatoria",
            pattern: {
              value: /^[a-zA-Z\s]+$/,
              message: "El formato de la descripción no es aceptado",
            },
          })}
          placeholder="Descripción completa"
          className="mt-2 dark:text-white dark:bg-gray-800"
        />
        {errors.descripcion && (
          <span className="mt-1 text-red-500">
            {errors.descripcion.message}
          </span>
        )}
      </div>

      <div className="mt-3">
        <label className="block text-custom-title dark:text-white font-semibold">
          Fecha de inicio
        </label>

        <Popover>
          <PopoverTrigger asChild>
            <div className="relative cursor-pointer">
              <Input
                placeholder="Selecciona una fecha"
                value={selectedDate ? format(selectedDate, "PPP") : ""}
                readOnly
                className="w-full mt-2 cursor-pointer dark:bg-gray-800 dark:text-white"
              />
              <CalendarDays className="absolute right-2 top-1/2 transform -translate-y-1/2 text-custom-title dark:text-white cursor-pointer" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleSelectStartDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {errors.fechaInicio && (
          <p className="text-red-500 mt-2">
            {errors.fechaInicio.message?.toString()}
          </p>
        )}
      </div>

      <div className="mt-3">
        <label className="block text-custom-title dark:text-white font-semibold">
          Fecha de finalización
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative">
              <Input
                placeholder="Selecciona una fecha"
                value={
                  selectedDataFinish ? format(selectedDataFinish, "PPP") : ""
                }
                readOnly
                className="w-full mt-2 cursor-pointer dark:bg-gray-800 dark:text-white"
              />
              <CalendarDays className="absolute right-2 top-1/2 transform -translate-y-1/2 text-custom-title dark:text-white cursor-pointer" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDataFinish}
              onSelect={handleSelectEndDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {errors.fechaFin && (
          <p className="text-red-500 mt-2">
            {errors.fechaFin.message?.toString()}
          </p>
        )}
      </div>

      <div className="mt-3">
        <label className="text-custom-title dark:text-white font-bold">
          Prioridad
        </label>

        <Select value={selectedPrioridad} onValueChange={handlePrioridadChange}>
          <SelectTrigger className="w-full dark:bg-gray-800 dark:text-white">
            <SelectValue placeholder="Selecciona la prioridad" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Prioridad</SelectLabel>
              <SelectItem value="Baja">Baja</SelectItem>
              <SelectItem value="Media">Media</SelectItem>
              <SelectItem value="Alta">Alta</SelectItem>
              <SelectItem value="Critica">Critica</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {!tareaUpdate && (
        <div className="mt-3">
          <label className="text-custom-title dark:text-white font-bold">
            Agregar dependencia
          </label>
          <RadioGroup
            className="w-full flex justify-around"
            value={dependencia}
            onValueChange={(value) => {
              setDependencia(value);
              setMostrar(value === "si");
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="si" id="r1" />
              <label htmlFor="r1">Si</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="r2" />
              <label htmlFor="r2">No</label>
            </div>
          </RadioGroup>
          {mostrar && (
            <Select onValueChange={(value) => handleTareaAsignada(value)}>
              <SelectTrigger className="w-full dark:bg-gray-800">
                <SelectValue placeholder="Selecciona la tarea" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tarea dependiente</SelectLabel>
                  {tareaDependencia && tareaDependencia.length > 0 ? (
                    tareaDependencia.map((tarea: TareasData) => (
                      <SelectItem key={tarea.id} value={tarea.id}>
                        {tarea.titulo}
                      </SelectItem>
                    ))
                  ) : (
                    <p>No se encontraron tareas por seleccionar</p>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>
      )}

      {!tareaUpdate && (
        <div className="mt-3">
          <label className="text-custom-title dark:text-white font-bold">
            Responsable de la tarea
          </label>
          <Select onValueChange={(value) => handleUsuarioAsignado(value)}>
            <SelectTrigger className="w-full dark:bg-gray-800">
              <SelectValue placeholder="Selecciona el responsable" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Responsable</SelectLabel>
                {usuariosSeleccionados && usuariosSeleccionados.length > 0 ? (
                  usuariosSeleccionados.map((usuario: UserType) => (
                    <SelectItem key={usuario.id} value={usuario.id}>
                      {usuario.nombre}
                    </SelectItem>
                  ))
                ) : (
                  <p>No se encontraron usuarios colaboradores</p>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex justify-end gap-5 mt-5">
        <AlertDialogCancel className="dark:text-white">
          Cancelar
        </AlertDialogCancel>
        <Button
          type="submit"
          className="bg-custom-title text-white dark:bg-white dark:text-custom-title"
        >
          {isEdit ? "Actualizar" : "Crear"}
        </Button>
      </div>
    </form>
  );
};

export default TareasForm;
