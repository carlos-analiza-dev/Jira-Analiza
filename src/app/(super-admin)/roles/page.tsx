"use client";
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
import { use, useEffect, useState } from "react";
import { clearUser } from "@/store/auth/sessionSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Roles() {
  const user = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [check, setCheck] = useState(true);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<DataRol>();
  const {
    result = [],
    loading,
    error,
  }: ResponseData = useAllRoles(check, offset, limit, user.token);

  useEffect(() => {
    if (error === "Request failed with status code 401") {
      dispatch(clearUser());
      router.push("/unauthorized");
    }
  }, [error, dispatch, router]);

  const onSubmit = async (data: DataRol) => {
    try {
      await createRol(data, user.token);
      setCheck(!check);
      reset();
      toast({
        title: "Departamento creado exitosamente",
      });
    } catch (error) {
      toast({
        title: "Error al crear el nuevo departamento.",
        variant: "destructive",
      });
    }
  };

  const handleNextPage = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  const handlePrevPage = () => {
    setOffset((prevOffset) => Math.max(prevOffset - limit, 0));
  };

  return (
    <div className="mx-auto px-4 md:px-12">
      <div className="flex justify-center mt-5 text-custom-title dark:text-white">
        <h1 className="text-2xl font-bold">Departamentos</h1>
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
                Agregar Departamento
              </AlertDialogTitle>
              <AlertDialogDescription className="text-custom-title dark:text-white">
                En esta sección puedes agregar nuevos puestos o departamentos
                dentro de la empresa.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-5 mb-5">
                <label className="text-custom-title dark:text-white font-medium">
                  Ingrese el nuevo departamento
                </label>
                <Input
                  autoFocus
                  {...register("nombre", {
                    required: "El nombre de departamento es obligatorio",
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Solo se permiten letras y espacios en blanco",
                    },
                  })}
                  className="mt-3"
                  placeholder="Nuevo departamento"
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
      <div className="flex justify-end gap-3 mt-5">
        <Button
          onClick={handlePrevPage}
          disabled={offset === 0}
          className="bg-custom-title text-white dark:bg-white dark:text-custom-title"
        >
          <ChevronLeft />
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={result ? result.length < 5 : true}
          className="bg-custom-title text-white dark:bg-white dark:text-custom-title"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
