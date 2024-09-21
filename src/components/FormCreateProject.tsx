"use client";

import createProjects from "@/api/createProjects";
import postEmailByUser from "@/api/postEmailByUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { CorreoType } from "@/types/correo.post.type";
import { DataProject } from "@/types/dataProjects.type";
import { UserType } from "@/types/user.type";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const FormCreateProject = () => {
  const user = useSelector((state: any) => state.auth);
  const [correo, setCorreo] = useState<string | null>(null);
  const [responsableId, setResponsableId] = useState<UserType | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<DataProject>();

  const onSubmit = async (data: DataProject) => {
    if (!responsableId) {
      toast({
        title: "Debe asignar un responsable antes de crear el proyecto.",
        variant: "destructive",
      });
      return;
    }

    try {
      const projectData = {
        ...data,
        responsableId: responsableId?.id,
      };
      await createProjects(projectData, user.token);
      toast({ title: "Proyecto creado exitosamente" });
      router.push("/admin-proyectos");
      reset();
    } catch (error: any) {
      toast({
        title:
          error?.response?.data?.statusCode === 401
            ? "Usuario no autorizado, no puedes ejecutar esta acción."
            : "Ocurrió un error al momento de crear el proyecto.",
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-100 w-full sm:w-3/5 p-4 rounded-md shadow dark:bg-gray-900"
    >
      <div className="mt-3">
        <label className="text-custom-title dark:text-white">
          Nombre Proyecto
        </label>
        <Input
          {...register("nombre", {
            required: "El campo 'Nombre Proyecto' es obligatorio",
            pattern: {
              value: /^[a-zA-Z\s\W]+$/,
              message: "El campo solo acepta letras",
            },
          })}
          placeholder="Nombre proyecto"
          className="dark:bg-gray-800 "
        />
        {errors.nombre && (
          <p className="text-red-500 text-sm mt-2">
            {errors.nombre.message?.toString()}
          </p>
        )}
      </div>
      <div className="mt-3">
        <label className="text-custom-title dark:text-white">
          Nombre Cliente
        </label>
        <Input
          {...register("cliente", {
            required: "El campo 'Nombre Cliente' es obligatorio",
            pattern: {
              value: /^[a-zA-Z\s\W]+$/,
              message: "El campo solo acepta letras",
            },
          })}
          placeholder="Nombre cliente"
          className="dark:bg-gray-800 "
        />
        {errors.cliente && (
          <p className="text-red-500 text-sm mt-2">
            {errors.cliente.message?.toString()}
          </p>
        )}
      </div>
      <div className="mt-3">
        <label className="text-custom-title dark:text-white">Descripción</label>
        <Input
          {...register("descripcion", {
            required: "El campo 'Descripción' es obligatorio",
            pattern: {
              value: /^[a-zA-Z\s\W]+$/,
              message: "El campo solo acepta letras",
            },
          })}
          placeholder="Descripción del proyecto"
          className="dark:bg-gray-800"
        />
        {errors.descripcion && (
          <p className="text-red-500 text-sm mt-2">
            {errors.descripcion.message?.toString()}
          </p>
        )}
      </div>
      <div className="mt-3">
        <label className="text-custom-title dark:text-white">Responsable</label>
        <div className="relative">
          <Input
            value={correo || ""}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Correo del responsable"
            className="dark:bg-gray-800"
          />
          <Search
            size={20}
            className="absolute text-custom-title dark:text-white top-1/2 transform right-1 -translate-y-1/2 cursor-pointer"
            onClick={handleSearchResponsable}
          />
        </div>
        <div>
          {responsableId && (
            <p className="text-custom-title dark:text-white font-bold text-sm mt-2">
              Responsable seleccionado:
              <span className="font-medium"> {responsableId.nombre}</span>
            </p>
          )}
        </div>
      </div>
      <div className="mt-3 w-full">
        <Button
          type="submit"
          className="p-3 w-full bg-custom-title dark:bg-white text-white dark:text-custom-title font-bold rounded-sm shadow-sm"
        >
          Crear Proyecto
        </Button>
      </div>
    </form>
  );
};

export default FormCreateProject;
