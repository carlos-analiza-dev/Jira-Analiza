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
  users: UserType[] | null;
  check: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
}
const TableAuth = ({ users, check, setCheck }: Props) => {
  const { toast } = useToast();
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);

  useEffect(() => {
    if (users) {
      const updatedFilteredUsers = users.filter(
        (user) => user.autorizado === 0
      );
      setFilteredUsers(updatedFilteredUsers);
    }
  }, [users, check]);

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

      window.location.reload();
    } catch (error) {
      toast({ title: "Error al autorizar el usuario", variant: "destructive" });
    }
  };

  if (!filteredUsers || filteredUsers.length === 0) {
    return (
      <div className="block">
        <div className="flex justify-center mt-10">
          <Image src="/notfound.svg" alt="NotFound" width={400} height={500} />
        </div>
        <div className="mt-5">
          <p className="text-center font-bold text-custom-title text-2xl dark:text-white">
            No se encontraron usuarios por autorizar.
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
          <TableHead className="text-center  text-custom-title dark:text-white font-bold">
            Nombre
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Correo
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Sexo
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Departamento
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Sucursal
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
        {filteredUsers.map((user: UserType) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium text-custom-title dark:text-white text-center">
              {user.nombre}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center">
              {user.correo}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center">
              {user.sexo}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center">
              {user.role?.nombre}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center">
              {user.sucursal?.nombre}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center">
              {user.direccion}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center">
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
                      <AlertDialogDescription className="text-custom-title dark:text-white">
                        ¡Debes estar seguro de esta acción antes de continuar!
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          handleAuthorize(user.id, user.autorizado ?? 0)
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
