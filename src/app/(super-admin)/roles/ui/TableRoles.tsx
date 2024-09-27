import { TableRolesData } from "@/types/table.roles.type";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import deleteRol from "@/api/deleteRol";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import updateRol from "@/api/updateRol";
import { Input } from "@/components/ui/input";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import Image from "next/image";
import { useSelector } from "react-redux";

export interface Props {
  roles: TableRolesData[];
  check: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
}

const TableRoles = ({ roles, check, setCheck }: Props) => {
  const user = useSelector((state: any) => state.auth);
  const { toast } = useToast();

  const [selectedRol, setSelectedRol] = useState<TableRolesData | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TableRolesData>();
  const handleDelete = async (id: string) => {
    try {
      await deleteRol(id, user.token);
      setCheck(!check);
      toast({ title: "Departamento eliminado exitosamente" });
    } catch (error) {
      toast({
        title: "No es posible eliminar este departamento.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (rol: TableRolesData) => {
    setSelectedRol(rol);
    reset(rol);
  };

  const handleUpdate = async (data: TableRolesData) => {
    try {
      if (selectedRol) {
        const response = await updateRol(
          selectedRol.id,
          data.nombre,
          user.token
        );
        setCheck(!check);
        toast({ title: "Departamento actualizado exitosamente" });
        setSelectedRol(null);
      }
    } catch (error) {
      toast({
        title: "No se pudo actualizar este departamento",
        variant: "destructive",
      });
    }
  };

  if (!roles || roles.length === 0) {
    return (
      <div className="block">
        <div className="flex justify-center mt-10">
          <Image src="/empty.svg" alt="NotFound" width={400} height={500} />
        </div>
        <div className="mt-5">
          <p className="text-center font-bold text-custom-title text-2xl dark:text-white">
            No se encontraron departamentos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex mx-auto px-3">
      <Table>
        <TableCaption className="text-custom-title dark:text-white">
          Lista de departamentos
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center text-custom-title dark:text-white">
              Numero de depto
            </TableHead>
            <TableHead className="text-center text-custom-title dark:text-white">
              Nombre
            </TableHead>
            <TableHead className="text-center text-custom-title dark:text-white">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((rol: TableRolesData) => (
            <TableRow key={rol.id}>
              <TableCell className="font-medium text-center">
                {rol.id}
              </TableCell>
              <TableCell className="text-center">{rol.nombre}</TableCell>
              <TableCell className="text-center">
                <div className="flex justify-around gap-3 sm:gap-0">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline">
                        <Trash2 size={15} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-custom-title dark:text-white">
                          ¿Estas seguro de eliminar este departamento?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Una vez elimines el departamento no podras revertirlo
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="text-custom-title dark:text-white">
                          Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(rol.id)}
                          className="bg-custom-title text-white dark:bg-white dark:text-custom-title"
                        >
                          Continuar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Button onClick={() => handleEdit(rol)} variant="outline">
                    <Pencil size={15} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedRol && (
        <AlertDialog
          open={!!selectedRol}
          onOpenChange={() => setSelectedRol(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-custom-title dark:text-white">
                Actualizar Rol
              </AlertDialogTitle>
              <AlertDialogDescription>
                Por favor, realiza los cambios necesarios y confirma para
                actualizar el departamento.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <form onSubmit={handleSubmit(handleUpdate)}>
              <div className="mt-5 mb-5">
                <label className="text-custom-title dark:text-white font-medium">
                  Nombre del departamento
                </label>
                <Input
                  autoFocus
                  {...register("nombre", {
                    required: "El nombre del departamento es obligatorio",
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Solo se permiten letras y espacios en blanco",
                    },
                  })}
                  className="mt-3"
                  placeholder="Nombre del departamento"
                />
                {errors.nombre && (
                  <p className="text-red-500 mt-2">
                    {errors.nombre.message?.toString()}
                  </p>
                )}
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel type="button">Cancelar</AlertDialogCancel>
                <Button
                  type="submit"
                  className="bg-custom-title text-white dark:bg-white dark:text-custom-title"
                >
                  Actualizar
                </Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default TableRoles;
