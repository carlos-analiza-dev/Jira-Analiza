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
import useAllRoles from "@/api/getAllRoles";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import updateRol from "@/api/updateRol";
import { Input } from "@/components/ui/input";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import Image from "next/image";

export interface Props {
  roles: TableRolesData[];
  check: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
}

const TableRoles = ({ roles, check, setCheck }: Props) => {
  const { toast } = useToast();
  const { result: allRoles } = useAllRoles(check);
  const [selectedRol, setSelectedRol] = useState<TableRolesData | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TableRolesData>();
  const handleDelete = async (id: string) => {
    try {
      await deleteRol(id);
      setCheck(!check);
      toast({ title: "Rol eliminado exitosamente" });
    } catch (error) {
      console.error("Failed to delete role:", error);
      toast({
        title: "Rol asignado a usuarios, no es posible eliminarlo.",
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
        const response = await updateRol(selectedRol.id, data.nombre);
        setCheck(!check);
        toast({ title: "Rol actualizado exitosamente" });
        setSelectedRol(null);
      }
    } catch (error) {
      console.log("Error interno", error);
      toast({
        title: "No se pudo actualizar este rol",
        variant: "destructive",
      });
    }
  };

  if (!allRoles || allRoles.length === 0) {
    return (
      <div className="block">
        <div className="flex justify-center mt-10">
          <Image src="/empty.svg" alt="NotFound" width={400} height={500} />
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
    <>
      <Table>
        <TableCaption className="text-custom-title dark:text-white">
          Lista de roles
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center text-custom-title dark:text-white">
              Numero de rol
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
          {allRoles.map((rol: TableRolesData) => (
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
                          ¿Estas seguro de eliminar este rol?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Una vez elimines el rol no podras revertirlo
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
                actualizar el rol.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <form onSubmit={handleSubmit(handleUpdate)}>
              <div className="mt-5 mb-5">
                <label className="text-custom-title dark:text-white font-medium">
                  Nombre del rol
                </label>
                <Input
                  autoFocus
                  {...register("nombre", {
                    required: "El nombre del rol es obligatorio",
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Solo se permiten letras y espacios en blanco",
                    },
                  })}
                  className="mt-3"
                  placeholder="Nombre del Rol"
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
    </>
  );
};

export default TableRoles;
