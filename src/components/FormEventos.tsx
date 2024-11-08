import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { PostEvento } from "@/types/postEevento";
import createEvento from "@/api/eventos/createEvento";
import { useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { DataEventos } from "@/types/evento.type";
import updateEvento from "@/api/eventos/updateEvento";
import { UserType } from "@/types/user.type";
import useGetUsersActivesAndAuth from "@/api/users/getUserActivesAndAutorizados";

interface Props {
  check: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
  showDialog: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  evento?: DataEventos;
}

const FormEventos = ({
  check,
  setCheck,
  showDialog,
  setShowDialog,
  evento,
}: Props) => {
  const user = useSelector((state: any) => state.auth);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<PostEvento>({
    defaultValues: evento || {},
  });
  const { result, loading, error } = useGetUsersActivesAndAuth(user.token);

  const [usuarios, setUsuarios] = useState<UserType | []>([]);
  const [responsableId, setResponsableId] = useState<string>("");

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    evento?.fechaInicio ? new Date(evento.fechaInicio) : undefined
  );
  const [selectedDataFinish, setSelectedDataFinish] = useState<
    Date | undefined
  >(evento?.fechaFin ? new Date(evento.fechaFin) : undefined);
  const [selectedTipoEvento, setSelectedTipoEvento] = useState<
    string | undefined
  >(evento?.tipoEvento || undefined);
  const [selectedEstado, setSelectedEstado] = useState<string | undefined>(
    evento?.estado || undefined
  );

  useEffect(() => {
    if (evento) {
      reset({
        nombre: evento.nombre,
        descripcion: evento.descripcion,
        fechaInicio: evento.fechaInicio,
        fechaFin: evento.fechaFin,
        tipoEvento: evento.tipoEvento,
        estado: evento.estado,
      });
    }
  }, [evento, reset]);

  useEffect(() => {
    setUsuarios(result);
  }, [result, user.token]);

  const onSubmit = async (data: PostEvento) => {
    try {
      if (evento) {
        await updateEvento(evento.id, data, user.token);
        setCheck(!check);
        toast({ title: "Evento actualizado exitosamente" });
        setShowDialog(!showDialog);
      } else {
        await createEvento({ ...data, responsableId }, user.token);
        setCheck(!check);
        toast({ title: "Evento creado exitosamente." });
        reset();
        setShowDialog(!showDialog);
      }
    } catch (error: any) {
      if (Array.isArray(error.response.data.message)) {
        error.response.data.message.forEach((msg: string) => {
          toast({
            title: msg,
            variant: "destructive",
          });
        });
      } else {
        toast({
          title:
            error.response.data.message ||
            "Ocurrió un error al crear el evento.",
          variant: "destructive",
        });
      }
    }
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

  const handleSelectTipoEvento = (value: string) => {
    setSelectedTipoEvento(value);
    setValue("tipoEvento", value);
  };

  const handleSelectEstado = (value: string) => {
    setSelectedEstado(value);
    setValue("estado", value);
  };

  const handleValueIdRol = (value: string) => {
    setResponsableId(value);
  };

  return (
    <form
      className="p-4 shadow-md bg-gray-50 dark:bg-gray-900 rounded-md grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mt-3">
        <label className="block text-custom-title dark:text-white font-semibold">
          Nombre del evento
        </label>
        <Input
          {...register("nombre", {
            required: "El campo 'Nombre de evento' es requerido.",
            pattern: {
              value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,;:()\-]+$/,
              message: "Nombre de evento inválido.",
            },
          })}
          placeholder="Nombre Evento"
          className="w-full mt-2"
        />
        {errors.nombre && (
          <p className="text-red-500 mt-2">
            {errors.nombre.message?.toString()}
          </p>
        )}
      </div>

      <div className="mt-3">
        <label className="block text-custom-title dark:text-white font-semibold">
          Descripción del evento
        </label>
        <Textarea
          {...register("descripcion", {
            required: "El campo descripción es requerido",
            pattern: {
              value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,;:()\-]+$/,
              message: "La descripción del evento es inválida.",
            },
          })}
          placeholder="Descripción del evento"
          className="w-full mt-2"
        />
        {errors.descripcion && (
          <p className="text-red-500 mt-2">
            {errors.descripcion.message?.toString()}
          </p>
        )}
      </div>

      <div className="mt-3">
        <label className="block text-custom-title dark:text-white font-semibold">
          Tipo de evento
        </label>
        <Select
          value={selectedTipoEvento}
          onValueChange={handleSelectTipoEvento}
        >
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Selecciona el evento">
              {selectedTipoEvento ? selectedTipoEvento : "Selecciona el evento"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Evento</SelectLabel>
              <SelectItem value="Conferencia">Conferencia</SelectItem>
              <SelectItem value="Seminario">Seminario</SelectItem>
              <SelectItem value="Festivo">Festivo</SelectItem>
              <SelectItem value="Virtual">Virtual</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {errors.tipoEvento && (
          <p className="text-red-500 mt-2">
            {errors.tipoEvento.message?.toString()}
          </p>
        )}
      </div>

      {!evento && (
        <div className="mt-3">
          <label className="block text-custom-title dark:text-white font-semibold">
            Responsable
          </label>
          <Select onValueChange={(value) => handleValueIdRol(value)}>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="-- Selecciona responsable --" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Responsable</SelectLabel>
                {Array.isArray(usuarios) && usuarios.length > 0 ? (
                  usuarios.map((user: UserType) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.nombre}
                    </SelectItem>
                  ))
                ) : (
                  <p>No hay usuarios disponibles.</p>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}

      {evento && (
        <div className="mt-3">
          <label className="block text-custom-title dark:text-white font-semibold">
            Estado del evento
          </label>
          <Select value={selectedEstado} onValueChange={handleSelectEstado}>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Selecciona el estado">
                {selectedEstado ? selectedEstado : "Selecciona el estado"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Estado</SelectLabel>
                <SelectItem value="Activo">Activo</SelectItem>
                <SelectItem value="Pospuesto">Pospuesto</SelectItem>
                <SelectItem value="Finalizado">Finalizado</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {errors.estado && (
            <p className="text-red-500 mt-2">
              {errors.estado.message?.toString()}
            </p>
          )}
        </div>
      )}

      <div className="mt-3">
        <label className="block text-custom-title dark:text-white font-semibold">
          Fecha de inicio
        </label>

        <Popover>
          <PopoverTrigger asChild>
            <div className="relative">
              <Input
                placeholder="Selecciona una fecha"
                value={selectedDate ? format(selectedDate, "PPP") : ""}
                readOnly
                className="w-full mt-2 cursor-pointer"
              />
              <CalendarDays className="absolute right-2 top-1/2 transform -translate-y-1/2 text-custom-title dark:text-white" />
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
              <CalendarDays className="absolute right-2 top-1/2 transform -translate-y-1/2 text-custom-title dark:text-white" />
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

      <div className="sm:col-span-2">
        <Button
          className="w-full mt-6 bg-custom-title text-white dark:bg-white dark:text-custom-title font-bold"
          type="submit"
        >
          {evento ? "Actualizar Evento" : "Crear Evento"}
        </Button>
      </div>
    </form>
  );
};

export default FormEventos;
