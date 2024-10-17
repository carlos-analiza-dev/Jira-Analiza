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
import createActividad from "@/api/createActividad";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import updateActividad from "@/api/updateActividad";
import useGetColaboradoresEventos from "@/api/getUserColaboradoresByEvento";

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

  const [usuariosSeleccionados, setUsuariosSeleccionados] = useState<
    UserType[]
  >([]);
  const [usuarioAsignado, setUsuarioAsignado] = useState("");

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
    }
    setValue("eventoId", eventoId);
  }, [actividadUpdate, eventoId, setValue]);

  const onSubmit = async (data: PostActividad) => {
    const { titulo, descripcion } = data;

    try {
      if (isEdit && actividadUpdate?.id) {
        await updateActividad(
          actividadUpdate.id,
          { titulo, descripcion },
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
          { ...data, eventoId, usuarioAsignado },
          user.token
        );

        toast({ title: "Actividad creada exitosamente" });
      }
      setCheck(!check);

      reset();
    } catch (error) {
      console.log("ERROR ACTIVIDAD", error);

      toast({
        title: "Ocurrió un error al momento de procesar la actividad",
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
