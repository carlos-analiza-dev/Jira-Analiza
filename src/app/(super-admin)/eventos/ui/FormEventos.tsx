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
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

const FormEventos = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [setselectedDataFinish, setSetselectedDataFinish] = useState<
    Date | undefined
  >(undefined);

  return (
    <form className="p-4 shadow-md bg-gray-50 dark:bg-gray-900 rounded-md">
      <div className="mt-3">
        <label className="block text-custom-title dark:text-white font-semibold">
          Nombre del evento
        </label>
        <Input placeholder="Nombre Evento" className="w-full mt-2" />
      </div>
      <div className="mt-3">
        <label className="block text-custom-title dark:text-white font-semibold">
          Descripción del evento
        </label>
        <Textarea placeholder="Descripción Evento" className="w-full mt-2" />
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
              onSelect={setSelectedDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="mt-3">
        <label className="block text-custom-title dark:text-white font-semibold">
          Fecha de finalizacion
        </label>

        <Popover>
          <PopoverTrigger asChild>
            <div className="relative">
              <Input
                placeholder="Selecciona una fecha"
                value={
                  setselectedDataFinish
                    ? format(setselectedDataFinish, "PPP")
                    : ""
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
              selected={setselectedDataFinish}
              onSelect={setSetselectedDataFinish}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="mt-4 flex justify-center mb-3">
        <Button className="bg-custom-title dark:bg-white text-white dark:text-custom-title font-semibold w-full">
          Agregar Evento
        </Button>
      </div>
    </form>
  );
};

export default FormEventos;
