import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
} from "@/components/ui/alert-dialog";

import updateUser from "@/api/updateUser";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import deleteUser from "@/api/deleteUser";
import { useForm } from "react-hook-form";
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
import { UserUpdateType } from "@/types/userUpdate.type";
import useAllRoles from "@/api/getAllRoles";
import { TableRolesData } from "@/types/table.roles.type";
import useAllSucursal from "@/api/getSucursale";
import { SucursalData } from "@/types/sucursal.type";
import { useSelector } from "react-redux";
import { UserType } from "@/types/user.type";

export type UsersTable = {
  users: UserType[];
  check: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
};

const TableUsers = ({ users, check, setCheck }: UsersTable) => {
  const user = useSelector((state: any) => state.auth);
  const { result } = useAllRoles();
  const { resultSucursal } = useAllSucursal();
  const { toast } = useToast();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserUpdateType>();
  const [userUpdate, setUserUpdate] = useState<UserType | null>(null);

  const handleToggleActive = async (
    userId: string,
    currentState: number,
    token?: string
  ) => {
    const newState = currentState === 1 ? 0 : 1;
    const updateData = { isActive: newState };

    try {
      const response = await updateUser(userId, updateData, user.token);
      console.log("RESPONSE UPDATE ACTIVIDAD", response);

      toast({
        title: "La actividad del usuario ha sido actualizada exitosamente",
      });
      setCheck(!check);
    } catch (error) {
      toast({
        title: "Ocurrio un error al actualizar la actividad.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteUser(id);
      setCheck(!check);
      toast({ title: "Usuario eliminado exitosamente" });
    } catch (error) {
      toast({
        title: "Ocurrió un error al eliminar el usuario",
        variant: "destructive",
      });
    }
  };

  const handleUser = (user: UserType) => {
    setUserUpdate(user);
    reset(user);
  };

  const onSubmit = async (data: UserUpdateType) => {
    console.log("DATA DE UPDATE", data);

    try {
      if (userUpdate) {
        const response = await updateUser(userUpdate.id, data, user.token);
        console.log("response update", response);

        setCheck(!check);
        toast({ title: "Usuario actualizado exitosamente" });
      }
    } catch (error) {
      console.log("ERROR", error);

      toast({
        title: "Error al actualizar el usuario",
        variant: "destructive",
      });
    }
  };

  console.log("USER UPDATE", userUpdate);

  if (!users || users.length === 0) {
    return (
      <div className="block">
        <div className="flex justify-center mt-10">
          <Image src="/notfound.svg" alt="NotFound" width={400} height={500} />
        </div>
        <div className="mt-5">
          <p className="text-center font-bold text-custom-title text-2xl dark:text-white">
            No se encontraron usuarios.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Table>
      <TableCaption className="text-custom-title dark:text-white font-bold">
        Lista de Usuarios
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Nombre
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Correo
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Sexo
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Edad
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            DNI
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Dirección
          </TableHead>
          <TableHead className="text-custom-title dark:text-white font-bold">
            Autorizado
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Estado
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Acciones
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium text-custom-title dark:text-white">
              {user.nombre}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center">
              {user.correo}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center">
              {user.sexo}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center">
              {user.edad}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center">
              {user.dni}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center">
              {user.direccion}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center">
              {user.autorizado ? "Autorizado" : "No autorizado"}
            </TableCell>
            <TableCell className=" text-custom-title dark:text-white text-center">
              {`${user.isActive ? "Activo" : "Inactivo"}`}
            </TableCell>
            <TableCell className=" text-custom-title dark:text-white text-center">
              <div className="flex justify-center gap-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">
                      {user.isActive === 0 ? "Activar" : "Desactivar"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <div className="flex justify-end">
                        <AlertDialogCancel>X</AlertDialogCancel>
                      </div>
                      <AlertDialogTitle className="text-custom-title dark:text-white">
                        ¿Estás seguro de{" "}
                        {user.isActive === 0 ? "activar" : "desactivar"} este
                        usuario?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        ¡Debes estar seguro de esta acción antes de continuar!
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          handleToggleActive(user.id, user.isActive ?? 0)
                        }
                        className="bg-custom-title dark:bg-white dark:text-custom-title font-semibold"
                      >
                        Continuar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="icon" variant="outline">
                      <Trash2 />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <div className="flex justify-end">
                        <AlertDialogCancel>X</AlertDialogCancel>
                      </div>
                      <AlertDialogTitle className="text-custom-title dark:text-white">
                        ¿Estás seguro de eliminar este usuario?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-custom-title dark:text-white">
                        ¡Debes estar seguro de esta acción antes de continuar!
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(user.id)}
                        className="bg-custom-title dark:bg-white dark:text-custom-title font-semibold"
                      >
                        Continuar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="icon"
                      onClick={() => handleUser(user)}
                      variant="outline"
                    >
                      <Pencil />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <div className="flex justify-end">
                        <AlertDialogCancel>X</AlertDialogCancel>
                      </div>
                      <AlertDialogTitle className="text-custom-title dark:text-white">
                        ¿Estás seguro de editar este usuario?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-custom-title dark:text-white">
                        ¡Debes estar seguro de esta acción antes de continuar!
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="p-2">
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
                                  message:
                                    "El campo correo no cumple con los requisitos.",
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
                              defaultValue={userUpdate?.sexo}
                            >
                              <SelectTrigger className="p-3 rounded-md shadow w-full mt-1">
                                <SelectValue placeholder="-- Seleccione una Opcion --" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Sexo</SelectLabel>
                                  <SelectItem value="M">Masculino</SelectItem>
                                  <SelectItem value="F">Femenino</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="mt-2">
                            <label className="block font-bold text-lg mb-2 text-custom-title dark:text-white">
                              Edad
                            </label>
                            <Input
                              type="number"
                              {...register("edad", {
                                required: "La edad es obligatoria",
                                pattern: {
                                  value: /^\d+$/,
                                  message: "El campo solo acepta numeros.",
                                },
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
                                  message:
                                    "El campo solo acepta letras y espacios en blanco.",
                                },
                              })}
                              placeholder="Direccion"
                            />
                          </div>
                          <div className="mt-2">
                            <label className="block font-bold text-lg mb-2 text-custom-title dark:text-white">
                              Rol
                            </label>
                            <Select
                              {...register("role.id", {
                                required: "El rol es obligatorio",
                              })}
                              defaultValue={userUpdate?.role?.id}
                            >
                              <SelectTrigger className="p-3 rounded-md shadow w-full mt-1">
                                <SelectValue
                                  placeholder={
                                    userUpdate?.role?.nombre ||
                                    "-- Seleccione una Opción --"
                                  }
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Rol</SelectLabel>

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
                              {...register("sucursal.id", {
                                required: "La sucursal es obligatoria.",
                              })}
                              defaultValue={userUpdate?.sucursal?.id}
                            >
                              <SelectTrigger className="p-3 rounded-md shadow w-full mt-1">
                                <SelectValue
                                  placeholder={
                                    userUpdate?.sucursal?.nombre ||
                                    "-- Seleccione una Opción --"
                                  }
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Sucursal</SelectLabel>

                                  {resultSucursal?.data.map(
                                    (res: SucursalData) => (
                                      <SelectItem key={res.id} value={res.id}>
                                        {res.nombre}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="mt-3">
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              type="submit"
                              className="bg-custom-title dark:bg-white dark:text-custom-title font-semibold"
                            >
                              Continuar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </div>
                      </form>
                    </div>
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

export default TableUsers;
