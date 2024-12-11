import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
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
import { CalendarDays, Pencil, Trash2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

import { UserType } from "@/types/user.type";
import { useSelector } from "react-redux";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { DataEventos } from "@/types/evento.type";
import { formatFecha } from "@/helpers/formatDate";
import { CorreoType } from "@/types/correo.post.type";
import postEmailByUser from "@/api/users/postEmailByUser";
import updateEvento from "@/api/eventos/updateEvento";
import { useForm } from "react-hook-form";
import { PostEvento } from "@/types/postEevento";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import removeEvento from "@/api/eventos/removeEvento";

interface Props {
  eventos: DataEventos[];
  check: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
}

const EventosRechazadosTable = ({ eventos, check, setCheck }: Props) => {
  const [eventosRejectes, setEventosRejectes] = useState<DataEventos[]>([]);
  const [editingEvento, setEditingEvento] = useState<DataEventos | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<PostEvento>({
    defaultValues: editingEvento || {},
  });
  const user = useSelector((state: any) => state.auth);
  const [correo, setCorreo] = useState<string | null>(null);
  const [responsableId, setResponsableId] = useState<UserType | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("no");
  const [mostrar, setMostrar] = useState(false);
  const [status, setStatus] = useState<string>("");

  const [selectedDataFinish, setSelectedDataFinish] = useState<
    Date | undefined
  >(editingEvento?.fechaFin ? new Date(editingEvento.fechaFin) : undefined);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    editingEvento?.fechaInicio ? new Date(editingEvento.fechaInicio) : undefined
  );

  useEffect(() => {
    if (editingEvento) {
      setSelectedDate(new Date(editingEvento.fechaInicio));
      setSelectedDataFinish(new Date(editingEvento.fechaFin));

      // Mantén los valores del formulario sin resetear
      setValue("nombre", editingEvento.nombre);
      setValue("descripcion", editingEvento.descripcion);
      setValue("fechaInicio", new Date(editingEvento.fechaInicio));
      setValue("fechaFin", new Date(editingEvento.fechaFin));
      setValue("tipoEvento", editingEvento.tipoEvento);
      setValue("statusEvento", editingEvento.statusEvento);
    }
  }, [editingEvento, reset, setValue]);

  useEffect(() => {
    if (eventos) {
      setEventosRejectes(eventos);
    }
  }, [eventos]);

  const handleEdit = (evento: DataEventos) => {
    setEditingEvento(evento);
    setStatus(evento.statusEvento ?? "");
    setSelectedDate(new Date(evento.fechaInicio));
    setSelectedDataFinish(new Date(evento.fechaFin));

    setValue("nombre", evento.nombre);
    setValue("descripcion", evento.descripcion);
    setValue("fechaInicio", new Date(evento.fechaInicio));
    setValue("fechaFin", new Date(evento.fechaFin));
    setValue("tipoEvento", evento.tipoEvento);
    setValue("statusEvento", evento.statusEvento);
  };

  const handleSave = async (data: PostEvento) => {
    if (!editingEvento) return;

    try {
      const res = await updateEvento(
        editingEvento.id,
        {
          statusEvento: status,
          responsableId: responsableId?.id,
          fechaInicio: data.fechaInicio,
          fechaFin: data.fechaFin,
        },
        user.token
      );

      setCheck(!check);
      window.location.reload();
      setEditingEvento(null);
      setCorreo(null);
      setResponsableId(null);
      setSelectedOption("no");
      setMostrar(false);
      toast({ title: "Evento actualizado correctamente." });
    } catch (error: any) {
      toast({
        title: error.response.data
          ? error.response.data.message
          : "Error al guardar el evento.",
        variant: "destructive",
      });
    }
  };

  const handleSearchResponsable = async () => {
    if (!correo) {
      toast({ title: "Ingrese un correo válido.", variant: "destructive" });
      return;
    }

    try {
      const response = await postEmailByUser(
        { correo } as CorreoType,
        user.token
      );

      if (response) {
        setResponsableId(response);
        toast({ title: `Responsable encontrado: ${response.nombre}` });
      } else {
        toast({
          title: "No se encontró el usuario con el correo proporcionado.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error al encontrar el usuario.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteevento = async (eventoId: string) => {
    try {
      const res = await removeEvento(eventoId, user.token);
      console.log("RES DELE", res);
      setEventosRejectes((evento) => evento.filter((p) => p.id !== eventoId));
      toast({ title: "Evento eliminaddo correctamente." });
    } catch (error) {
      console.log("ELIMINAR ERROR");

      toast({
        title: "Error al eliminar el evento.",
        variant: "destructive",
      });
    }
  };

  const resetStates = () => {
    setEditingEvento(null);
    setCorreo(null);
    setResponsableId(null);
    setSelectedOption("no");
    setMostrar(false);
  };

  const handleCancel = () => {
    resetStates();
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

  if (!eventosRejectes || eventosRejectes.length === 0) {
    return (
      <div className="mt-5 flex justify-center items-center text-center w-full">
        <p className="text-custom-title dark:text-white font-bold text-3xl">
          No se encontraron proyectos rechazados.
        </p>
      </div>
    );
  }

  return (
    <Table className="mt-3">
      <TableCaption className="text-center text-custom-title dark:text-white font-bold">
        Lista de proyectos rechazados.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Proyecto
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Descripcion
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Estado
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Justificacion
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Inicia
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Finaliza
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Responsable
          </TableHead>

          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Acciones
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {eventosRejectes.map((evento) => (
          <TableRow key={evento.id}>
            <TableCell className="text-custom-title dark:text-white text-center font-medium">
              {evento.nombre}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center font-medium">
              {evento.descripcion}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center font-medium">
              {evento.statusEvento}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center font-medium">
              {evento.justificacion}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center font-medium">
              {formatFecha(evento.fechaInicio.toString())}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center font-medium">
              {formatFecha(evento.fechaFin.toString())}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center font-medium">
              {evento.responsable?.nombre || "N/A"}
            </TableCell>

            <TableCell className="text-custom-title dark:text-white text-center font-medium">
              <div className="flex justify-around gap-3 sm:gap-0">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Pencil
                      onClick={() => handleEdit(evento)}
                      className="cursor-pointer"
                    />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <div className="flex justify-end">
                      <AlertDialogCancel
                        onClick={handleCancel}
                        className="font-semibold"
                      >
                        X
                      </AlertDialogCancel>
                    </div>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-custom-title dark:text-white font-bold">
                        ¿Estas seguro de editar este evento?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-custom-title dark:text-white font-medium">
                        En esta sección podrás editar tu evento rechazado.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div>
                      <label className="block text-sm font-medium text-custom-title dark:text-white">
                        Asignar nuevo responsable
                      </label>
                      <RadioGroup
                        className="flex"
                        value={selectedOption}
                        onValueChange={(value) => {
                          setSelectedOption(value);
                          setMostrar(value === "si");
                        }}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="si" id="r1" />
                          <label htmlFor="r1">Sí</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="r2" />
                          <label htmlFor="r2">No</label>
                        </div>
                      </RadioGroup>
                      {mostrar && (
                        <>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center w-full gap-2 mt-2">
                              <Input
                                type="email"
                                placeholder="Correo del responsable"
                                value={correo || ""}
                                onChange={(e) => setCorreo(e.target.value)}
                                className="w-full border rounded px-2 py-1 dark:bg-gray-800"
                              />
                              <Button
                                onClick={handleSearchResponsable}
                                className="bg-custom-title dark:bg-white dark:text-custom-title font-semibold text-white  rounded"
                              >
                                Buscar
                              </Button>
                            </div>
                          </div>
                          <div className="mt-2">
                            <label className="block text-sm font-medium text-custom-title dark:text-white">
                              Nuevo Responsable
                            </label>
                            <Input
                              type="text"
                              value={responsableId?.nombre || ""}
                              disabled
                              className="w-full border rounded px-2 py-1 dark:bg-gray-800 mt-2"
                            />
                          </div>
                        </>
                      )}
                    </div>
                    <form
                      onSubmit={handleSubmit(handleSave)}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-custom-title dark:text-white">
                          Estado del evento
                        </label>
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="w-full border rounded px-2 py-2 dark:bg-gray-800 mt-2"
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="Rechazado">Rechazado</option>
                        </select>
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
                                value={
                                  selectedDate
                                    ? format(selectedDate, "PPP")
                                    : ""
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
                              selected={selectedDate}
                              onSelect={handleSelectStartDate}
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
                          Fecha de Finalizacion
                        </label>

                        <Popover>
                          <PopoverTrigger asChild>
                            <div className="relative cursor-pointer">
                              <Input
                                placeholder="Selecciona una fecha"
                                value={
                                  selectedDataFinish
                                    ? format(selectedDataFinish, "PPP")
                                    : ""
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
                            />
                          </PopoverContent>
                        </Popover>

                        {errors.fechaFin && (
                          <p className="text-red-500 mt-2">
                            {errors.fechaFin.message?.toString()}
                          </p>
                        )}
                      </div>

                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          className="bg-custom-title dark:bg-white text-white dark:text-custom-title font-semibold"
                        >
                          Continuar
                        </Button>
                      </div>
                    </form>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Trash2 className="cursor-pointer" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-custom-title dark:text-white font-bold">
                        ¿Estás seguro de eliminar este evento?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-custom-title dark:text-white font-medium">
                        Una vez ejecutes esta acción, no se podrá revertir.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="font-semibold">
                        Cancelar
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteevento(evento.id)}
                        className="bg-custom-title dark:bg-white text-white dark:text-custom-title font-semibold"
                      >
                        Continuar
                      </AlertDialogAction>
                    </AlertDialogFooter>
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

export default EventosRechazadosTable;
