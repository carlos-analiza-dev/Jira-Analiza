import { useForm } from "react-hook-form";
import { AlertDialogCancel } from "./ui/alert-dialog";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { PostActividad } from "@/types/PostActividad";
import { ActividadesType } from "@/types/actividades.type";
import { useEffect, useState } from "react";
import { UserType } from "@/types/user.type";
import { useSelector } from "react-redux";
import { useToast } from "./ui/use-toast";
import createActividad from "@/api/actividades/createActividad";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import updateActividad from "@/api/actividades/updateActividad";
import useGetColaboradoresEventos from "@/api/eventos/getUserColaboradoresByEvento";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import useGetActividadesByEventoId from "@/api/actividades/getActividadesByEventoId";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarDays } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";

interface Props {
  eventoId: string;
  check: boolean;
  isEdit?: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
  actividadUpdate?: ActividadesType | null;
}

const ActividadesForm = ({
  eventoId,
  check,
  setCheck,
  isEdit,
  actividadUpdate,
}: Props) => {
  const user = useSelector((state: any) => state.auth);
  const { toast } = useToast();
  const [mostrar, setMostrar] = useState(false);
  const [dependencia, setDependencia] = useState<string>("no");
  const [actividadSeleccionada, setActividadSeleccionada] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    actividadUpdate?.fechaInicio
      ? new Date(actividadUpdate.fechaInicio)
      : undefined
  );
  const [selectedDataFinish, setSelectedDataFinish] = useState<
    Date | undefined
  >(actividadUpdate?.fechaFin ? new Date(actividadUpdate.fechaFin) : undefined);
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<PostActividad>();

  const { result: usersActives } = useGetColaboradoresEventos(
    eventoId,
    user.token
  );
  const [actividadDependencia, setActividadDependencia] = useState<
    ActividadesType[]
  >([]);
  const [usuariosSeleccionados, setUsuariosSeleccionados] = useState<
    UserType[]
  >([]);
  const [usuarioAsignado, setUsuarioAsignado] = useState("");
  const { error, loading, result } = useGetActividadesByEventoId(
    eventoId,
    user.token
  );
  useEffect(() => {
    if (result) {
      setActividadDependencia(result);
    }
  }, [result, user.token]);

  useEffect(() => {
    if (usersActives && usersActives) {
      setUsuariosSeleccionados(usersActives);
    } else {
      setUsuariosSeleccionados([]);
    }
  }, [user.token, usersActives]);

  useEffect(() => {
    if (actividadUpdate) {
      setValue("titulo", actividadUpdate.titulo);
      setValue("descripcion", actividadUpdate.descripcion);
      setValue;
    }
    setValue("eventoId", eventoId);
  }, [actividadUpdate, eventoId, setValue]);

  const onSubmit = async (data: PostActividad) => {
    const { titulo, descripcion, fechaInicio, fechaFin } = data;

    try {
      if (isEdit && actividadUpdate?.id) {
        await updateActividad(
          actividadUpdate.id,
          { titulo, descripcion, fechaInicio, fechaFin },
          user.token
        );

        toast({ title: "Actividad actualizada exitosamente" });
      } else {
        if (!usuarioAsignado) {
          toast({
            title: "Debe asigarse un responsable de esta actividad",
            variant: "destructive",
          });
          return;
        }
        await createActividad(
          {
            ...data,
            eventoId,
            usuarioAsignado,
            actividadDependenciaId: actividadSeleccionada,
          },
          user.token
        );

        toast({ title: "Actividad creada exitosamente" });
      }
      setCheck(!check);

      reset();
    } catch (error) {
      console.log(error);

      toast({
        title: "Ocurrió un error al momento de procesar la actividad",
        variant: "destructive",
      });
    }
  };

  const handleUsuarioAsignado = (value: string) => {
    setUsuarioAsignado(value);
  };

  const handleActividadAsignada = (value: string) => {
    setActividadSeleccionada(value);
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
      <input type="hidden" {...register("eventoId")} />

      <div className="mt-3">
        <label className="text-custom-title dark:text-white font-bold">
          Nombre de la actividad
        </label>
        <Input
          {...register("titulo", {
            required: "El nombre de la actividad es obligatorio",
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
          Descripción de la actividad
        </label>
        <Input
          {...register("descripcion", {
            required: "La descripción de la actividad es obligatoria",
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

      {!actividadUpdate && (
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
            <Select onValueChange={(value) => handleActividadAsignada(value)}>
              <SelectTrigger className="w-full dark:bg-gray-800">
                <SelectValue placeholder="Selecciona la tarea" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tarea dependiente</SelectLabel>
                  {actividadDependencia && actividadDependencia.length > 0 ? (
                    actividadDependencia.map((acti: ActividadesType) => (
                      <SelectItem key={acti.id} value={acti.id}>
                        {acti.titulo}
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
                className="w-full mt-2 cursor-pointer"
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
                className="w-full mt-2 cursor-pointer"
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

      {!actividadUpdate && (
        <div className="mt-3">
          <label className="text-custom-title dark:text-white font-bold">
            Responsable de la actividad
          </label>
          <Select onValueChange={(value) => handleUsuarioAsignado(value)}>
            <SelectTrigger className="w-full">
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
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction
          type="submit"
          className="bg-custom-title text-white dark:bg-white dark:text-custom-title p-2 rounded-sm"
        >
          {isEdit ? "Actualizar" : "Crear"}
        </AlertDialogAction>
      </div>
    </form>
  );
};

export default ActividadesForm;
