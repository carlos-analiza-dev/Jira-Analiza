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

import { SucursalData } from "@/types/sucursal.type";
import { Pencil, Trash2 } from "lucide-react";
import React from "react";
import deleteSucursal from "@/api/deleteSucursal";
import { useToast } from "@/components/ui/use-toast";
export interface dataTable {
  resultSucursal: SucursalData[];
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
  check: boolean;
}

const TableSucursales = ({ resultSucursal, check, setCheck }: dataTable) => {
  const { toast } = useToast();
  const handleDelete = async (id: string) => {
    try {
      const response = await deleteSucursal(id);
      console.log("RESPONSE DELETE SUCURSAL", response);

      setCheck(!check);
      toast({ title: "Sucursal eliminada exitosamente" });
    } catch (error) {
      console.log("ERROR ELIMINAR SUCURSAL");
      toast({
        title: "Ocurrio un error al eliminar la sucursal",
        variant: "destructive",
      });
    }
  };
  return (
    <Table>
      <TableCaption className="text-custom-title font-semibold dark:text-white">
        Lista de sucursales a nivel nacional.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-custom-title font-semibold dark:text-white text-center">
            Nombre Sucursal
          </TableHead>
          <TableHead className="text-custom-title font-semibold dark:text-white text-center">
            Direccion
          </TableHead>
          <TableHead className="text-custom-title font-semibold dark:text-white text-center">
            Departamento
          </TableHead>
          <TableHead className="text-custom-title font-semibold dark:text-white text-center">
            Acciones
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {resultSucursal.map((sucursal) => (
          <TableRow key={sucursal.id}>
            <TableCell className="text-custom-title font-medium dark:text-white text-center">
              {sucursal.nombre}
            </TableCell>
            <TableCell className="text-custom-title font-medium dark:text-white text-center">
              {sucursal.direccion}
            </TableCell>
            <TableCell className="text-custom-title font-medium dark:text-white text-center">
              {sucursal.departamento}
            </TableCell>
            <TableCell className="text-custom-title font-medium dark:text-white text-center">
              <div className="flex justify-around gap-3 sm:gap-0">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="bg-custom-title text-white dark:bg-white dark:text-custom-title">
                      <Trash2 size={15} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-custom-title dark:text-white">
                        ¿Estas seguro de eliminar esta sucursal?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="text-custom-title dark:text-white">
                        Cancelar
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(sucursal.id)}
                        className="bg-custom-title text-white dark:bg-white dark:text-custom-title"
                      >
                        Continuar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button className="bg-custom-title text-white dark:bg-white dark:text-custom-title">
                  <Pencil size={15} />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableSucursales;
