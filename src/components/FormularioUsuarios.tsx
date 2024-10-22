import { useSelector } from "react-redux";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "./ui/alert-dialog";
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
import { useForm } from "react-hook-form";
import { useToast } from "./ui/use-toast";
import useAllRoles from "@/api/getAllRoles";
import useAllSucursales from "@/api/getSucursalesNotPagination";
import { TableRolesData } from "@/types/table.roles.type";
import { SucursalData } from "@/types/sucursal.type";
import { UserUpdateType } from "@/types/userUpdate.type";
import { UserType } from "@/types/user.type";
import { useEffect, useState } from "react";
import updateUser from "@/api/updateUser";
import { Button } from "./ui/button";

interface Props {
  check: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;

  usuario?: UserType;
}

const FormularioUsuarios = ({ usuario, check, setCheck }: Props) => {
  const user = useSelector((state: any) => state.auth);
  const { toast } = useToast();
  const { result } = useAllRoles();
  const { resultSucursal } = useAllSucursales(user.token);
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserUpdateType>({ defaultValues: usuario || {} });
  const [tipoSexo, setTipoSexo] = useState<string | undefined>(
    usuario?.sexo || undefined
  );
  const [tipoRol, setTipoRol] = useState<string | undefined>(
    usuario?.role.id || undefined
  );
  const [tipoSucursal, setTipoSucursal] = useState<string | undefined>(
    usuario?.sucursal.id || undefined
  );

  useEffect(() => {
    if (usuario) {
      reset({
        nombre: usuario.nombre,
        correo: usuario.correo,
        direccion: usuario.direccion,
        sexo: usuario.sexo,
        edad: usuario.edad,
        dni: usuario.dni,
        roleId: usuario.role.id,
        sucursalId: usuario.sucursal.id,
      });
    }
  }, [usuario, reset]);

  const onSubmit = async (data: UserUpdateType) => {
    try {
      if (usuario) {
        await updateUser(usuario.id, data, user.token);
        setCheck(!check);
        toast({ title: "Usuario actualizado exitosamente" });
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

  const handleSelectTipoSexo = (value: string) => {
    setTipoSexo(value);
    setValue("sexo", value);
  };

  const handleSelectTipoRol = (value: string) => {
    setTipoRol(value);
    setValue("roleId", value);
  };

  const handleSelectTipoSucursal = (value: string) => {
    setTipoSucursal(value);
    setValue("sucursalId", value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="mt-2">
          <label className="block font-bold text-lg mb-2 text-custom-title dark:text-white">
            Nombre Completo
          </label>
          <Input
            {...register("nombre", {
              required: "El nombre es obligatorio",
              pattern: {
                value: /^[A-Za-zÀ-ÿ\s]+$/,
                message:
                  "El campo nombre solo acepta letras y espacios en blanco.",
              },
            })}
            placeholder="Nombre Completo"
          />
          {errors.nombre && (
            <span className="text-red-500">{errors.nombre.message}</span>
          )}
        </div>
        <div className="mt-2">
          <label className="block font-bold text-lg mb-2 text-custom-title dark:text-white">
            Correo
          </label>
          <Input
            type="email"
            {...register("correo", {
              required: "El correo es obligatorio",
              pattern: {
                value:
                  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                message: "El campo correo no cumple con los requisitos.",
              },
            })}
            placeholder="Correo Electrónico"
          />
          {errors.correo && (
            <span className="text-red-500">{errors.correo.message}</span>
          )}
        </div>
        <div className="mt-2">
          <label className="block font-bold text-lg mb-2 text-custom-title dark:text-white">
            Sexo
          </label>
          <Select
            {...register("sexo", {
              required: "El sexo es obligatorio",
            })}
            value={tipoSexo}
            onValueChange={handleSelectTipoSexo}
          >
            <SelectTrigger className="p-3 rounded-md shadow w-full mt-1">
              <SelectValue placeholder="Sexo">
                {tipoSexo === "M" ? "Masculino" : "Femenino"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sexo</SelectLabel>
                <SelectItem value="M">Masculino</SelectItem>
                <SelectItem value="F">Femenino</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.sexo && (
            <span className="text-red-500">{errors.sexo.message}</span>
          )}
        </div>
        <div className="mt-2">
          <label className="block font-bold text-lg mb-2 text-custom-title dark:text-white">
            Edad
          </label>
          <Input
            type="number"
            {...register("edad", {
              required: "La edad es obligatoria",
            })}
            placeholder="Edad"
          />
          {errors.edad && (
            <span className="text-red-500">{errors.edad.message}</span>
          )}
        </div>
        <div className="mt-2">
          <label className="block font-bold text-lg mb-2 text-custom-title dark:text-white">
            Numero de identificacion
          </label>
          <Input
            type="text"
            {...register("dni", {
              required: "La identidad es obligatoria",
              pattern: {
                value: /^(\d{8}-\d|\d{4}-\d{4}-\d{5})$/,
                message: "El campo solo acepta números.",
              },
            })}
            placeholder="Identidad"
          />
          {errors.dni && (
            <span className="text-red-500">{errors.dni.message}</span>
          )}
        </div>
        <div className="mt-2">
          <label className="block font-bold text-lg mb-2 text-custom-title dark:text-white">
            Dirección
          </label>
          <Input
            type="text"
            {...register("direccion", {
              required: "La dirección es obligatoria",
              pattern: {
                value: /^[A-Za-zÀ-ÿ\s]+$/,
                message: "El campo solo acepta letras y espacios en blanco.",
              },
            })}
            placeholder="Dirección"
          />
          {errors.direccion && (
            <span className="text-red-500">{errors.direccion.message}</span>
          )}
        </div>
        <div className="mt-2">
          <label className="block font-bold text-lg mb-2 text-custom-title dark:text-white">
            Departamento
          </label>
          <Select
            {...register("roleId", { required: "El rol es obligatorio" })}
            value={tipoRol}
            onValueChange={handleSelectTipoRol}
          >
            <SelectTrigger className="p-3 rounded-md shadow w-full mt-1">
              <SelectValue placeholder="Selecciona un Rol">
                {result?.data.find((rol) => rol.id === tipoRol)?.nombre ||
                  "Selecciona un Rol"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Departamento</SelectLabel>
                {result?.data.map((res: TableRolesData) => (
                  <SelectItem key={res.id} value={res.id}>
                    {res.nombre}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.roleId && (
            <span className="text-red-500">{errors.roleId.message}</span>
          )}
        </div>
        <div className="mt-2">
          <label className="block font-bold text-lg mb-2 text-custom-title dark:text-white">
            Sucursal
          </label>
          <Select
            {...register("sucursalId", {
              required: "La sucursal es obligatoria.",
            })}
            value={tipoSucursal}
            onValueChange={handleSelectTipoSucursal}
          >
            <SelectTrigger className="p-3 rounded-md shadow w-full mt-1">
              <SelectValue placeholder="Sucursal">
                {resultSucursal?.find(
                  (sucursal: { id: string | undefined }) =>
                    sucursal.id === tipoSucursal
                )?.nombre || "Selecciona la sucursal"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sucursal</SelectLabel>
                {resultSucursal && resultSucursal.length > 0 ? (
                  resultSucursal.map((res: SucursalData) => (
                    <SelectItem key={res.id} value={res.id}>
                      {res.nombre}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled value="no-sucursales">
                    No hay sucursales disponibles
                  </SelectItem>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.sucursalId && (
            <span className="text-red-500">{errors.sucursalId.message}</span>
          )}
        </div>
      </div>
      <div className="mt-3">
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button
            type="submit"
            className="bg-custom-title dark:bg-white dark:text-custom-title font-semibold"
          >
            Actualizar
          </Button>
        </AlertDialogFooter>
      </div>
    </form>
  );
};

export default FormularioUsuarios;
