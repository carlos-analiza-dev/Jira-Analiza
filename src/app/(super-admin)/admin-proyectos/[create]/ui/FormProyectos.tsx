"use client";
import createProjects from "@/api/createProjects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { DataProject } from "@/types/dataProjects.type";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const FormProyectos = () => {
  const user = useSelector((state: any) => state.auth);
  const { toast } = useToast();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<DataProject>();

  const onSubmit = async (data: DataProject) => {
    try {
      const response = await createProjects(data, user.token);
      toast({ title: "Proyecto creado exitosamente" });
      reset();
    } catch (error: any) {
      toast({
        title: `${error?.response?.data?.statusCode === 401 ? "Usuario no autorizado, no puedes ejecutar esta accion." : "Ocurrio un error al momento de crear el proyecto."}`,
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
        <label className="text-custom-title dark:text-white">Descripcion</label>
        <Input
          {...register("descripcion", {
            required: "El campo 'Descripcion' es obligatorio",
            pattern: {
              value: /^[a-zA-Z\s\W]+$/,
              message: "El campo solo acepta letras",
            },
          })}
          placeholder="Descripcion del proyecto"
          className="dark:bg-gray-800"
        />
        {errors.descripcion && (
          <p className="text-red-500 text-sm mt-2">
            {errors.descripcion.message?.toString()}
          </p>
        )}
      </div>
      {/*  <div className="mt-3">
            <label className="text-custom-title dark:text-white">Estado</label>
            <Select>
              <SelectTrigger className="w-full dark:bg-gray-800">
                <SelectValue placeholder="Seleccione un estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Estado</SelectLabel>
                  <SelectItem value="grapes">En progreso</SelectItem>
                  <SelectItem value="pineapple">Finalizado</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div> */}
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

export default FormProyectos;
