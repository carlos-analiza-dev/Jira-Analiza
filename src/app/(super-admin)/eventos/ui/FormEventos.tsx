"use client";
import React, { useState } from "react";
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
import createEvento from "@/api/createEvento";
import { useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  check: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
  showDialog: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormEventos = ({ check, setCheck, showDialog, setShowDialog }: Props) => {
  const user = useSelector((state: any) => state.auth);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<PostEvento>();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedDataFinish, setSelectedDataFinish] = useState<
    Date | undefined
  >(undefined);

  const [selectedTipoEvento, setSelectedTipoEvento] = useState<
    string | undefined
  >(undefined);

  const onSubmit = async (data: PostEvento) => {
    try {
      const response = await createEvento(data, user.token);
      toast({ title: "Evento creado exitosamente." });
      setCheck(!check);
      setShowDialog(!showDialog);
    } catch (error: any) {
      console.log("ERROR EVENTO", error);

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
  return (
    <form
      className="p-4 shadow-md bg-gray-50 dark:bg-gray-900 rounded-md"
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
          placeholder="Descripción Evento"
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
        <Select onValueChange={handleSelectTipoEvento}>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Selecciona el evento" />
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
          <PopoverContent align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleSelectStartDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
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
          <PopoverContent align="start">
            <Calendar
              mode="single"
              selected={selectedDataFinish}
              onSelect={handleSelectEndDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="mt-4 flex justify-center mb-3">
        <Button
          type="submit"
          className="bg-custom-title dark:bg-white text-white dark:text-custom-title font-semibold w-full"
        >
          Agregar Evento
        </Button>
      </div>
    </form>
  );
};

export default FormEventos;
