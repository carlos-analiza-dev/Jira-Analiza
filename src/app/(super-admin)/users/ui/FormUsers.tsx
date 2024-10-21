import useAllRoles from "@/api/getAllRoles";
import useAllSucursales from "@/api/getSucursalesNotPagination";
import updateUser from "@/api/updateUser";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
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
import { SucursalData } from "@/types/sucursal.type";
import { TableRolesData } from "@/types/table.roles.type";
import { UserType } from "@/types/user.type";
import { UserUpdateType } from "@/types/userUpdate.type";
import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

interface Props {
  check: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
  userUpdate: UserType | null;
}

const FormUsers = ({ check, setCheck, userUpdate }: Props) => {
  const user = useSelector((state: any) => state.auth);
  const { toast } = useToast();
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserUpdateType>();
  const [sexo, setSexo] = useState("");
  const { result } = useAllRoles();
  const { resultSucursal } = useAllSucursales(user.token);
  const [roleId, setRoleId] = useState<string>("");
  const [sucursalId, setSucursalId] = useState<string>("");

  useEffect(() => {
    if (userUpdate) {
      reset({
        nombre: userUpdate.nombre,
        correo: userUpdate.correo,
        sexo: userUpdate.sexo,
        edad: userUpdate.edad,
        dni: userUpdate.dni,
        direccion: userUpdate.direccion,
      });
      setSexo(userUpdate.sexo);
      setValue("sexo", userUpdate.sexo);
      setRoleId(userUpdate.role.id);
      setValue("roleId", userUpdate.role.id);
      setSucursalId(userUpdate.sucursal.id);
      setValue("sucursalId", userUpdate.sucursal.id);
    }
  }, [userUpdate, reset]);

  const onSubmit = async (data: UserUpdateType) => {
    if (data.edad) {
      data.edad = Number(data.edad);
    }

    if (!sexo) {
      toast({ title: "El sexo es obligatorio", variant: "destructive" });
      return;
    }

    data.sexo = sexo;
    data.roleId = roleId;
    data.sucursalId = sucursalId;

    try {
      if (userUpdate) {
        const response = await updateUser(userUpdate.id, data, user.token);

        setCheck(!check);
        toast({ title: "Usuario actualizado exitosamente" });
      }
    } catch (error) {
      toast({
        title: "Error al actualizar el usuario",
        variant: "destructive",
      });
    }
  };

  const handleSexo = (value: string) => {
    setSexo(value);
  };

  const handleRoleId = (value: string) => {
    setRoleId(value);
  };

  const handleSucursalId = (value: string) => {
    setSucursalId(value);
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
              required: "El nombre es obligatoria",
              pattern: {
                value: /^[A-Za-zÀ-ÿ\s]+$/,
                message:
                  "El campo nombre solo acepta letras y espacion en blanco.",
              },
            })}
            placeholder="Nombre Completo"
          />
        </div>
        <div className="mt-2">
          <label className="block font-bold text-lg mb-2 text-custom-title dark:text-white">
            Correo
          </label>
          <Input
            type="email"
            {...register("correo", {
              required: "El correo es obligatoria",
              pattern: {
                value:
                  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                message: "El campo correo no cumple con los requisitos.",
              },
            })}
            placeholder="Correo Electronico"
          />
        </div>
        <div className="mt-2">
          <label className="block font-bold text-lg mb-2 text-custom-title dark:text-white">
            Sexo
          </label>
          <Select
            {...register("sexo", {
              required: "El sexo es obligatorio",
            })}
            onValueChange={(value) => {
              handleSexo(value);
              // Actualizar el valor en el formulario también
              setValue("sexo", value); // Asegúrate de importar y usar setValue de useForm
            }}
          >
            <SelectTrigger className="p-3 rounded-md shadow w-full mt-1">
              <SelectValue
                placeholder={sexo === "M" ? "Masculino" : "Femenino"}
              />
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
        </div>
        <div className="mt-2">
          <label className="block font-bold text-lg mb-2 text-custom-title dark:text-white">
            Identidad
          </label>
          <Input
            type="text"
            {...register("dni", {
              required: "La identidad es obligatoria",
              pattern: {
                value: /^\d+$/,
                message: "El campo solo acepta numeros.",
              },
            })}
            placeholder="Identidad"
          />
        </div>
        <div className="mt-2">
          <label className="block font-bold text-lg mb-2 text-custom-title dark:text-white">
            Direccion
          </label>
          <Input
            type="text"
            {...register("direccion", {
              required: "La direccion es obligatoria",
              pattern: {
                value: /^[A-Za-zÀ-ÿ\s]+$/,
                message: "El campo solo acepta letras y espacios en blanco.",
              },
            })}
            placeholder="Direccion"
          />
        </div>
        <div className="mt-2">
          <label className="block font-bold text-lg mb-2 text-custom-title dark:text-white">
            Departamento
          </label>
          <Select
            {...register("roleId", { required: "El rol es obligatorio" })}
            defaultValue={userUpdate?.role?.id}
            onValueChange={(value) => handleRoleId(value)} // Aquí asignas el valor seleccionado
          >
            <SelectTrigger className="p-3 rounded-md shadow w-full mt-1">
              <SelectValue
                placeholder={
                  userUpdate?.role?.nombre || "-- Seleccione una Opción --"
                }
              />
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
        </div>
        <div className="mt-2">
          <label className="block font-bold text-lg mb-2 text-custom-title dark:text-white">
            Sucursal
          </label>
          <Select
            {...register("sucursalId", {
              required: "La sucursal es obligatoria.",
            })}
            defaultValue={userUpdate?.sucursal?.id}
            onValueChange={(value) => handleSucursalId(value)}
          >
            <SelectTrigger className="p-3 rounded-md shadow w-full mt-1">
              <SelectValue
                placeholder={
                  userUpdate?.sucursal?.nombre || "-- Seleccione una Opción --"
                }
              />
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
        </div>
      </div>
      <div className="mt-3">
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction className="bg-custom-title dark:bg-white dark:text-custom-title font-semibold">
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </div>
    </form>
  );
};

export default FormUsers;
