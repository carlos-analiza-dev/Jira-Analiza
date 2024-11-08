"use client";

import crearEmpresa from "@/api/empresas/crearEmpresa";
import updateEmpresa from "@/api/empresas/updateEmpresa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { DataEmpresa, PostEmpresa } from "@/types/empresa.type";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

interface Props {
  check: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  isEdit?: DataEmpresa | null;
}

const FormEmpresas = ({ check, setCheck, onClose, isEdit }: Props) => {
  const [estadoEmpresa, setEstadoEmpresa] = useState<string>("");

  const user = useSelector((state: any) => state.auth);
  const { toast } = useToast();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<PostEmpresa>();

  useEffect(() => {
    reset(isEdit ?? undefined);
    setEstadoEmpresa(isEdit?.estado || "");
  }, [isEdit, reset]);

  const onSubmit = async (data: PostEmpresa) => {
    try {
      if (isEdit) {
        const response = await updateEmpresa(
          isEdit.id,
          {
            nombre: data.nombre,
            descripcion: data.descripcion,
            estado: estadoEmpresa,
          },
          user.token
        );

        setCheck(!check);
        toast({ title: "Empresa actualizada exitosamente." });
      } else {
        const response = await crearEmpresa(user.token, data);
        setCheck(!check);

        reset();
        toast({ title: "Empresa creada exitosamente." });
      }
      onClose();
    } catch (error: any) {
      toast({
        title: "Ocurrio un error al momento de crear la empresa.",
        variant: "destructive",
      });
    }
  };

  const handleEstadoChange = (estado: string) => {
    setEstadoEmpresa(estado);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-3">
        <label className="block text-custom-title dark:text-white font-semibold">
          Nombre de la empresa
        </label>
        <Input
          {...register("nombre", {
            required: "El campo 'Nombre de empresa' es requerido.",
            pattern: {
              value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,;:()\-]+$/,
              message: "Nombre de empresa inválido.",
            },
          })}
          placeholder="Nombre Empresa"
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
          Descripcion de la empresa
        </label>
        <Textarea
          {...register("descripcion", {
            required: "El campo 'Descripcion de empresa' es requerido.",
            pattern: {
              value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,;:()\-]+$/,
              message: "Descripcion de la empresa inválido.",
            },
          })}
          placeholder="Descripcion Empresa"
          className="w-full mt-2"
        />
        {errors.descripcion && (
          <p className="text-red-500 mt-2">
            {errors.descripcion.message?.toString()}
          </p>
        )}
      </div>
      {isEdit && (
        <div className="mt-3">
          <label className="block text-custom-title dark:text-white font-semibold">
            Estado de la empresa
          </label>
          <Select
            onValueChange={handleEstadoChange}
            defaultValue={estadoEmpresa}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={estadoEmpresa || "Selecciona un estado"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Estado</SelectLabel>
                <SelectItem value="Activa">Activa</SelectItem>
                <SelectItem value="Inactiva">Inactiva</SelectItem>
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
      <div className="mt-3 w-full">
        <Button
          type="submit"
          className="bg-custom-title dark:bg-white text-white dark:text-custom-title font-semibold w-full"
        >
          {isEdit ? "Editar Empresa" : "Crear Empresa"}
        </Button>
      </div>
    </form>
  );
};

export default FormEmpresas;
