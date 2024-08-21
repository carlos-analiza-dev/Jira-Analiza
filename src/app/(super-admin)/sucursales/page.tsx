"use client";
import useAllSucursal from "@/api/getSucursale";
import TableSucursales from "./ui/TableSucursales";
import SkeletonTable from "@/components/SkeletonTable";
import { Button } from "@/components/ui/button";
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
import { useForm } from "react-hook-form";
import { SucursalData } from "@/types/sucursal.type";
import createSucursal from "@/api/createSucursal";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function SucursalPage() {
  const [check, setCheck] = useState(true);
  const { toast } = useToast();
  const { loading, resultSucursal } = useAllSucursal(check);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<SucursalData>();

  const onSubmit = async (data: SucursalData) => {
    try {
      const response = await createSucursal(data);
      setCheck(!check);
      reset();
      toast({ title: "Sucursal creada exitosamente" });
    } catch (error) {
      console.log("ERROR SUCURSAL", error);
      toast({
        title: "Hubo un errro al momento de crear la sucursal",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-3xl sm:max-w-5xl mx-auto">
      <div className="mt-5 text-center">
        <p className="text-custom-title font-bold text-3xl dark:text-white">
          Sucursales
        </p>
      </div>
      <div className="flex justify-end px-5">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="bg-custom-title text-white dark:bg-white dark:text-custom-title">
              Agregar
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="flex justify-end">
                <AlertDialogCancel>X</AlertDialogCancel>
              </div>
              <AlertDialogTitle className="text-custom-title dark:text-white font-bold">
                Agregar Sucursal
              </AlertDialogTitle>
              <AlertDialogDescription className="text-custom-title dark:text-white">
                En esta sección puedes agregar nuevas sucursales dentro de la
                empresa.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-5 mb-5">
                <label className="text-custom-title dark:text-white font-medium">
                  Nombre de Sucursal
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
                  placeholder="Nueva sucursal"
                />
                {errors.nombre && (
                  <p className="text-red-500 mt-2">
                    {errors.nombre.message?.toString()}
                  </p>
                )}
              </div>
              <div className="mt-5 mb-5">
                <label className="text-custom-title dark:text-white font-medium">
                  Direccion de Sucursal
                </label>
                <Input
                  {...register("direccion", {
                    required: "El campo direccion es obligatorio",
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Solo se permiten letras y espacios en blanco",
                    },
                  })}
                  className="mt-3"
                  placeholder="Direccion"
                />
                {errors.direccion && (
                  <p className="text-red-500 mt-2">
                    {errors.direccion.message?.toString()}
                  </p>
                )}
              </div>
              <div className="mt-5 mb-5">
                <label className="text-custom-title dark:text-white font-medium">
                  Departamento de Sucursal
                </label>
                <Input
                  {...register("departamento", {
                    required: "El campo departamento obligatorio",
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Solo se permiten letras y espacios en blanco",
                    },
                  })}
                  className="mt-3"
                  placeholder="Departamento"
                />
                {errors.departamento && (
                  <p className="text-red-500 mt-2">
                    {errors.departamento.message?.toString()}
                  </p>
                )}
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  type="submit"
                  disabled={Boolean(
                    errors.nombre || errors.direccion || errors.direccion
                  )}
                  className="bg-custom-title text-white dark:bg-white dark:text-custom-title"
                >
                  Continuar
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="mt-5">
        {loading ? (
          <SkeletonTable />
        ) : (
          <TableSucursales
            resultSucursal={resultSucursal}
            setCheck={setCheck}
            check={check}
          />
        )}
      </div>
    </div>
  );
}
