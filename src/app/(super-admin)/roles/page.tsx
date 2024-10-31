"use client";
import useAllRoles from "@/api/roles/getAllRoles";
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

import createRol from "@/api/roles/createRol";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { clearUser } from "@/store/auth/sessionSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { TableRolesData } from "@/types/table.roles.type";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaisesDataGenerico } from "../../../../data/paisesData";
import { PaisData } from "@/types/paits.data.type";
import ModalExpired from "@/components/ModalExpired";

export default function Roles() {
  const user = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [check, setCheck] = useState(true);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);
  const [paisStatus, setPaisStatus] = useState("");
  const pais = user.pais;
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TableRolesData>();
  const { result, loading, error } = useAllRoles(
    check,
    offset,
    limit,
    user.token,
    pais
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (error === "Request failed with status code 401") {
      setShowModal(true);
    }
  }, [error, dispatch, router]);

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(clearUser());
    router.push("/");
  };

  useEffect(() => {
    if (result) {
      setTotalPages(Math.ceil(result.total / limit));
    }
  }, [result, limit]);

  const onSubmit = async (data: TableRolesData) => {
    try {
      await createRol({ ...data, pais: paisStatus }, user.token);
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setOffset((page - 1) * limit);
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
              Agregar Departamento
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
              <div className="mt-5 mb-2">
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
              <div className="mt-2 mb-4 w-full">
                <label className="block text-lg font-semibold text-custom-title dark:text-white">
                  Pais
                </label>
                <Select value={paisStatus} onValueChange={setPaisStatus}>
                  <SelectTrigger className="p-3 rounded-md shadow w-full mt-1">
                    <SelectValue placeholder="-- Seleccione una Opcion --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Pais</SelectLabel>
                      {PaisesDataGenerico && PaisesDataGenerico.length > 0 ? (
                        PaisesDataGenerico.map((pais: PaisData) => (
                          <SelectItem key={pais.id} value={pais.nombre}>
                            {pais.nombre}
                          </SelectItem>
                        ))
                      ) : (
                        <p>No hay paises disponibles</p>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
        ) : error ? (
          <div className="block">
            <div className="flex justify-center mt-10">
              <Image src="empty.svg" alt="NotFound" width={400} height={500} />
            </div>
            <div className="mt-5">
              <p className="text-center font-bold text-custom-title text-2xl dark:text-white">
                No se encontraron departamentos.
              </p>
            </div>
          </div>
        ) : (
          result && (
            <TableRoles roles={result} check={check} setCheck={setCheck} />
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
      {showModal && <ModalExpired handleCloseModal={handleCloseModal} />}
    </div>
  );
}
