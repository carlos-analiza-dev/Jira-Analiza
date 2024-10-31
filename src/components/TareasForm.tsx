import createTarea from "@/api/tareas/createTarea";
import useGetByDepartamento from "@/api/users/getUserByRol";
import useGetUsersByRolesProyectos from "@/api/users/getUsersByRolProjects";
import updateTarea from "@/api/tareas/updateTarea";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
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
  const { toast } = useToast();
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<PostTarea>();

  const { result: usersByProjects } = useColaboradoresByProjectId(
    proyectoId,
    user.token
  );

  const [usuariosSeleccionados, setUsuariosSeleccionados] = useState<
    UserType[]
  >([]);
  const [usuarioAsignado, setUsuarioAsignado] = useState("");

  useEffect(() => {
    if (usersByProjects && usersByProjects) {
      setUsuariosSeleccionados(usersByProjects);
    } else {
      setUsuariosSeleccionados([]);
    }
  }, [user.token, usersByProjects]);

  useEffect(() => {
    if (tareaUpdate) {
      setValue("titulo", tareaUpdate.titulo);
      setValue("descripcion", tareaUpdate.descripcion);
    }
    setValue("proyectoId", proyectoId);
  }, [tareaUpdate, proyectoId, setValue]);

  const onSubmit = async (data: PostTarea) => {
    const { titulo, descripcion } = data;

    try {
      if (isEdit && tareaUpdate?.id) {
        await updateTarea(tareaUpdate.id, { titulo, descripcion }, user.token);

        toast({ title: "Tarea actualizada exitosamente" });
      } else {
        if (!usuarioAsignado) {
          toast({
            title: "Debe asigarse un responsable de esta tarea",
            variant: "destructive",
          });
          return;
        }
        await createTarea({ ...data, proyectoId, usuarioAsignado }, user.token);

        toast({ title: "Tarea creada exitosamente" });
      }
      setCheck(!check);
      onClose();
      reset();
    } catch (error) {
      toast({
        title: "Ocurrió un error al momento de procesar la tarea",
        variant: "destructive",
      });
    }
  };

  const handleUsuarioAsignado = (value: string) => {
    setUsuarioAsignado(value);
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
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
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
