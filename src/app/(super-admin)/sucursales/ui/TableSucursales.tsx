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
import React, { useState } from "react";
import deleteSucursal from "@/api/deleteSucursal";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import updateSucursal from "@/api/updateSucursal";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { departamentosData } from "../../../../../data/departamentos";
import { useSelector } from "react-redux";

export interface dataTable {
  resultSucursal: SucursalData[];
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
  check: boolean;
}

type SucursalFormData = Omit<SucursalData, "id">;

const TableSucursales = ({ resultSucursal, check, setCheck }: dataTable) => {
  const user = useSelector((state: any) => state.auth);
  const { toast } = useToast();
  const [sucursalUpdate, setSucursalUpdate] = useState<SucursalData | null>(
    null
  );
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<SucursalFormData>();

  const departamentoWatch = watch("departamento");

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteSucursal(id, user.token);
      setCheck(!check);
      toast({ title: "Sucursal eliminada exitosamente" });
    } catch (error) {
      toast({
        title: "Sucursal asignada a usuarios, no es posible eliminarla.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (sucursal: SucursalData) => {
    setSucursalUpdate(sucursal);
    reset({
      nombre: sucursal.nombre,
      direccion: sucursal.direccion,
      departamento: sucursal.departamento,
    });
  };

  const handleUpdate = async (data: SucursalFormData) => {
    try {
      if (sucursalUpdate) {
        const response = await updateSucursal(
          sucursalUpdate.id,
          data,
          user.token
        );
        setCheck(!check);
        setSucursalUpdate(null);
        toast({ title: "Sucursal actualizada exitosamente" });
      }
    } catch (error) {
      console.log("ERROR SUCURSAL", error);
      toast({
        title: "No se pudo actualizar la sucursal",
        variant: "destructive",
      });
    }
  };

  if (!resultSucursal || resultSucursal.length === 0) {
    return (
      <div className="flex justify-center mt-5">
        <p className="text-3xl font-bold text-custom-title dark:text-white">
          No se encontraron sucursales en la base de datos
        </p>
      </div>
    );
  }

  return (
    <>
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
              Dirección
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
                <div className="flex justify-around gap-3">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline">
                        <Trash2 size={15} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-custom-title dark:text-white">
                          ¿Estás seguro de eliminar esta sucursal?
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
                  <Button
                    onClick={() => handleEdit(sucursal)}
                    variant="outline"
                  >
                    <Pencil size={15} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {sucursalUpdate && (
        <AlertDialog
          open={!!sucursalUpdate}
          onOpenChange={() => setSucursalUpdate(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-custom-title dark:text-white">
                Actualizar Sucursal
              </AlertDialogTitle>
              <AlertDialogDescription className="text-custom-title dark:text-white">
                Por favor, realiza los cambios necesarios y confirma para
                actualizar la sucursal.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <form onSubmit={handleSubmit(handleUpdate)}>
              <div className="mt-5 mb-5">
                <label className="text-custom-title dark:text-white font-medium">
                  Nombre Sucursal
                </label>
                <Input
                  autoFocus
                  {...register("nombre", {
                    required: "El nombre de la sucursal es obligatorio",
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Solo se permiten letras y espacios en blanco",
                    },
                  })}
                  className="mt-3"
                  placeholder="Nombre Sucursal"
                />
                {errors.nombre && (
                  <p className="text-red-500 mt-2">
                    {errors.nombre.message?.toString()}
                  </p>
                )}
              </div>
              <div className="mt-5 mb-5">
                <label className="text-custom-title dark:text-white font-medium">
                  Dirección Sucursal
                </label>
                <Input
                  {...register("direccion", {
                    required: "La dirección de la sucursal es obligatoria",
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Solo se permiten letras y espacios en blanco",
                    },
                  })}
                  className="mt-3"
                  placeholder="Dirección Sucursal"
                />
                {errors.direccion && (
                  <p className="text-red-500 mt-2">
                    {errors.direccion.message?.toString()}
                  </p>
                )}
              </div>
              <div className="mt-5 mb-5">
                <label className="text-custom-title dark:text-white font-medium">
                  Departamento Sucursal
                </label>
                <Select
                  onValueChange={(value) => setValue("departamento", value)}
                  value={departamentoWatch}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        departamentoWatch || "Selecciona un departamento"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Departamentos</SelectLabel>
                      {departamentosData.map((dep) => (
                        <SelectItem key={dep.id} value={dep.nombre}>
                          {dep.nombre}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.departamento && (
                  <p className="text-red-500 mt-2">
                    {errors.departamento.message?.toString()}
                  </p>
                )}
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel className="text-custom-title dark:text-white">
                  Cancelar
                </AlertDialogCancel>
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

export default TableSucursales;
