import updateProyecto from "@/api/updateProyecto";
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
import { useToast } from "@/components/ui/use-toast";
import { DataProject } from "@/types/dataProjects.type";
import { TypeProyectos } from "@/types/proyectos.type";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
interface FormProyectos {
  proyecto: TypeProyectos;
  check?: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
}
const FormProyectos = ({ proyecto, setCheck, check }: FormProyectos) => {
  const user = useSelector((state: any) => state.auth);
  const { toast } = useToast();
  const [selectedEstado, setSelectedEstado] = useState(proyecto.estado);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<DataProject>({
    defaultValues: {
      nombre: proyecto.nombre,
      cliente: proyecto.cliente,
      descripcion: proyecto.descripcion,
      estado: proyecto.estado,
    },
  });

  useEffect(() => {
    reset(proyecto);
    setSelectedEstado(proyecto.estado);
  }, [proyecto, reset]);

  const onSubmit = async (data: DataProject) => {
    const projectData = {
      nombre: data.nombre,
      cliente: data.cliente,
      descripcion: data.descripcion,
      estado: selectedEstado,
    };

    try {
      const response = await updateProyecto(
        proyecto.id,
        projectData,
        user.token
      );
      setCheck(!check);
      toast({ title: "Proyecto actualizado con éxito" });
    } catch (error) {
      toast({
        title: "Error al actualizar el proyecto",
        variant: "destructive",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-100 w-full sm:w-full p-4 rounded-md shadow dark:bg-gray-900"
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
      <div className="mt-3">
        <label className="text-custom-title dark:text-white">Estado</label>
        <Select
          value={selectedEstado}
          onValueChange={(value) => setSelectedEstado(value)}
        >
          <SelectTrigger className="w-full dark:bg-gray-800">
            <SelectValue placeholder={proyecto.estado} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Estado</SelectLabel>
              <SelectItem value="En Progreso">En Progreso</SelectItem>
              <SelectItem value="Finalizado">Finalizado</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {errors.estado && (
          <p className="text-red-500 text-sm mt-2">
            {errors.estado.message?.toString()}
          </p>
        )}
      </div>
      <div className="mt-3 w-full">
        <Button
          type="submit"
          className="p-3 w-full bg-custom-title dark:bg-white text-white dark:text-custom-title font-bold rounded-sm shadow-sm"
        >
          Actualizar Proyecto
        </Button>
      </div>
    </form>
  );
};

export default FormProyectos;
