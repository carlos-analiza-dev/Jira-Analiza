"use client"
import useAllRoles from "@/api/getAllRoles";
import SkeletonTable from "@/components/SkeletonTable";
import { Button } from "@/components/ui/button";
import { ResponseData } from "@/types/response.type";
import TableRoles from "./ui/TableRoles";
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
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { DataRol } from "@/types/dataPost.rol.type";
import createRol from "@/api/createRol";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function Roles() {
  const [check, setCheck] = useState(true);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<DataRol>();
  const { result, loading }: ResponseData = useAllRoles(check);

  const onSubmit = async (data: DataRol) => {
    try {
      const response = await createRol(data);
      setCheck(!check);
      reset();
      toast({
        title: "Rol creado exitosamente",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error al crear el nuevo rol.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-3xl sm:max-w-5xl">
      <div className="flex justify-center mt-5 text-custom-title dark:text-white">
        <h1 className="text-2xl font-bold">Roles Usuario</h1>
      </div>
      <div className="flex justify-end mt-5 px-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="bg-custom-title text-white dark:bg-white dark:text-custom-title font-semibold">
              Agregar
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-custom-title dark:text-white font-bold">
                Agregar Rol
              </AlertDialogTitle>
              <AlertDialogDescription className="text-custom-title dark:text-white">
                En esta sección puedes agregar nuevos puestos o roles dentro de
                la empresa.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-5 mb-5">
                <label className="text-custom-title dark:text-white font-medium">
                  Ingrese el nuevo rol
                </label>
                <Input
                  autoFocus
                  {...register("nombre", {
                    required: "El nombre de rol es obligatorio",
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Solo se permiten letras y espacios en blanco",
                    },
                  })}
                  className="mt-3"
                  placeholder="Nuevo Rol"
                />
                {errors.nombre && (
                  <p className="text-red-500 mt-2">
                    {errors.nombre.message?.toString()}
                  </p>
                )}
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  type="submit"
                  disabled={Boolean(errors.nombre)}
                  className="bg-custom-title text-white dark:bg-white dark:text-custom-title"
                >
                  Continuar
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="mt-5 w-full">
        {loading ? (
          <SkeletonTable />
        ) : (
          <TableRoles roles={result} check={check} setCheck={setCheck} />
        )}
      </div>
    </div>
  );
}
