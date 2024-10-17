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
import { Controller, useForm } from "react-hook-form";
import { SucursalData } from "@/types/sucursal.type";
import createSucursal from "@/api/createSucursal";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { departamentosData } from "../../../../data/departamentos";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { clearUser } from "@/store/auth/sessionSlice";
import { useSelector } from "react-redux";

export default function SucursalPage() {
  const user = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [check, setCheck] = useState(true);
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [departamento, setDepartamento] = useState("");
  const { toast } = useToast();
  const { loading, resultSucursal, error } = useAllSucursal(
    check,
    user.token,
    offset,
    limit,
    departamento
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SucursalData>();

  useEffect(() => {
    if (error === "Request failed with status code 401") {
      dispatch(clearUser());
      router.push("/");
    }
  }, [error, dispatch, router]);

  useEffect(() => {
    if (resultSucursal) {
      setTotalPages(Math.ceil(resultSucursal.total / limit));
    }
  }, [resultSucursal, limit]);

  const handleDepartamentoChange = (value: string) => {
    setDepartamento(value === "all" ? "" : value);
  };

  const onSubmit = async (data: SucursalData) => {
    try {
      const response = await createSucursal(data, user.token);
      setCheck(!check);
      reset();
      toast({ title: "Sucursal creada exitosamente" });
    } catch (error) {
      toast({
        title: "Hubo un error al momento de crear la sucursal",
        variant: "destructive",
      });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setOffset((page - 1) * limit);
  };

  return (
    <div className="mx-auto px-4 md:px-12">
      <div className="mt-5 text-center">
        <p className="text-custom-title font-bold text-3xl dark:text-white">
          Sucursales
        </p>
      </div>
      <div className="w-full flex justify-between px-5 mt-5 mb-4 gap-4">
        <div>
          <Select onValueChange={handleDepartamentoChange}>
            <SelectTrigger className="w-auto">
              <SelectValue placeholder="Departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Departamento</SelectLabel>
                <SelectItem value="all">Todas</SelectItem>
                {departamentosData.map((depto) => (
                  <SelectItem key={depto.id} value={depto.nombre}>
                    {depto.nombre}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
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
                    Departamento Sucursal
                  </label>
                  <Controller
                    name="departamento"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecciona un departamento" />
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
                    )}
                    rules={{
                      required: "El departamento de la sucursal es obligatorio",
                    }}
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
      </div>
      <div className="mt-5">
        {loading ? (
          <SkeletonTable />
        ) : error ? (
          <p className="text-center text-red-500 text-2xl mt-8">
            No se encontraron sucursales disponibles en este departamento
          </p>
        ) : (
          resultSucursal && (
            <TableSucursales
              resultSucursal={resultSucursal}
              setCheck={setCheck}
              check={check}
            />
          )
        )}
      </div>
      <div className="flex justify-between mt-5">
        <Button
          className="bg-custom-title text-white dark:bg-white dark:text-custom-title font-bold"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Anterior
        </Button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <Button
          className="bg-custom-title text-white dark:bg-white dark:text-custom-title font-bold"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
