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
import { useEffect, useState } from "react";
import updateUser from "@/api/updateUser";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
export interface Props {
  users: UserType[];
  check: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
}
const TableAuth = ({ users, check, setCheck }: Props) => {
  const { toast } = useToast();

  const handleAuthorize = async (
    userId: string,
    currentState: number,
    token?: string
  ) => {
    const newState = currentState === 1 ? 0 : 1;
    const updateData = { autorizado: newState };

    try {
      await updateUser(userId, updateData, token);
      toast({ title: "Autorización del usuario actualizada exitosamente" });
      setCheck(!check);
    } catch (error) {
      console.error("Error al autorizar el usuario:", error);
    }
  };
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
        Lista de Usuarios por Autorizar
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
            Acciones
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user: UserType) => (
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
              <div className="flex justify-center gap-2">
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

export default TableAuth;