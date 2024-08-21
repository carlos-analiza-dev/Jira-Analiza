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

import { UserType } from "@/types/user.type";
import updateUser from "@/api/updateUser";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export type UsersTable = {
  users: UserType[];
};

const TableUsers = ({ users }: UsersTable) => {
  const { toast } = useToast();
  const [userTable, setUserTable] = useState<UserType[]>(users);

  useEffect(() => {
    setUserTable(users);
  }, [users]);

  const handleToggleActive = async (
    userId: string,
    currentState: number,
    token?: string
  ) => {
    const newState = currentState === 1 ? 0 : 1;
    const updateData = { isActive: newState };

    try {
      const response = await updateUser(userId, updateData, token);
      console.log("Usuario actualizado:", response);
      toast({
        title: "La actividad del usuario ha sido actualizada exitosamente",
      });

      setUserTable((prevUserTable) =>
        prevUserTable.map((user) =>
          user.id === userId ? { ...user, isActive: newState } : user
        )
      );
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  const handleAuthorize = async (
    userId: string,
    currentState: number,
    token?: string
  ) => {
    const newState = currentState === 1 ? 0 : 1;
    const updateData = { autorizado: newState };

    try {
      const response = await updateUser(userId, updateData, token);
      console.log("Usuario autorizado:", response);
      toast({ title: "Autorizacion del usuario actualizada exitosamente" });

      setUserTable((prevUserTable) =>
        prevUserTable.map((user) =>
          user.id === userId ? { ...user, autorizado: newState } : user
        )
      );
    } catch (error) {
      console.error("Error al autorizar el usuario:", error);
    }
  };

  if (!userTable || userTable.length === 0) {
    return (
      <p className="mt-5 text-center font-bold text-custom-title text-3xl dark:text-white">
        No se encontraron usuarios.
      </p>
    );
  }

  return (
    <Table>
      <TableCaption className="text-custom-title dark:text-white font-bold">
        Lista de Usuarios
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center w-[100px] text-custom-title dark:text-white font-bold">
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
        {userTable.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium text-custom-title dark:text-white">
              {user.nombre}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white">
              {user.correo}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white">
              {user.sexo}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white">
              {user.edad}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white">
              {user.dni}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white">
              {user.direccion}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white">
              {user.autorizado ? "Autorizado" : "No autorizado"}
            </TableCell>
            <TableCell className="text-right text-custom-title dark:text-white">
              {`${user.isActive ? "Activo" : "Inactivo"}`}
            </TableCell>
            <TableCell className="text-right text-custom-title dark:text-white">
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
                          handleToggleActive(user.id, user.isActive)
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
                    <Button variant="outline">
                      {user.autorizado === 0 ? "Autorizar" : "Desautorizar"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <div className="flex justify-end">
                        <AlertDialogCancel>X</AlertDialogCancel>
                      </div>
                      <AlertDialogTitle className="text-custom-title dark:text-white">
                        ¿Estás seguro de{" "}
                        {user.autorizado === 0 ? "autorizar" : "desautorizar"}{" "}
                        este usuario?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        ¡Debes estar seguro de esta acción antes de continuar!
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          handleAuthorize(user.id, user.autorizado)
                        }
                        className="bg-custom-title dark:bg-white dark:text-custom-title font-semibold"
                      >
                        Continuar
                      </AlertDialogAction>
                    </AlertDialogFooter>
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
