"use client";
import SkeletonTable from "@/components/SkeletonTable";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TableEventosManager from "./ui/TableEventosManager";
import { useSelector } from "react-redux";
import useGetEventosManager from "@/api/eventos/useGetEventosManager";
import FormEventos from "@/components/FormEventos";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearUser } from "@/store/auth/sessionSlice";
import ModalExpired from "@/components/ModalExpired";

const ManagerEventos = () => {
  const user = useSelector((state: any) => state.auth);
  const [check, setCheck] = useState(true);
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [tipoEvento, setTipoEvento] = useState<string>("");
  const { result, loading, error } = useGetEventosManager(
    user.token,
    check,
    limit,
    offset,
    tipoEvento
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (result) {
      setTotalPages(Math.ceil(result.total / limit));
    }
  }, [result, limit]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setOffset((page - 1) * limit);
  };

  const handleEstadoChange = (value: string) => {
    setTipoEvento(value === "all" ? "" : value);
  };

  useEffect(() => {
    if (error === "Request failed with status code 401") {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(clearUser());
    router.push("/");
  };

  return (
    <div className="mx-auto w-full">
      <div className="mt-5 mb-4 flex justify-center w-full">
        <h1 className="text-2xl font-bold text-custom-title dark:text-white ">
          Eventos Manager
        </h1>
      </div>
      <div className="">
        <h3 className="text-lg font-medium text-custom-title dark:text-white ">
          Gestiona los eventos de Laboratorios Centroamericanos.
        </h3>
      </div>
      <div className="w-full flex justify-between mt-5">
        <Select onValueChange={handleEstadoChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tipo Evento" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tipo Evento</SelectLabel>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Conferencia">Conferencia</SelectItem>
              <SelectItem value="Seminario">Seminario</SelectItem>
              <SelectItem value="Festivo">Festivo</SelectItem>
              <SelectItem value="Virtual">Virtual</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <AlertDialog
          open={showDialog}
          onOpenChange={() => setShowDialog(!showDialog)}
        >
          <AlertDialogTrigger asChild>
            <div className="sm:mx-5">
              <Button className="bg-custom-title dark:bg-white text-white dark:text-custom-title font-semibold ">
                Agregar Evento
              </Button>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className="w-full max-w-2xl">
            <AlertDialogHeader>
              <div className="flex justify-end">
                <AlertDialogCancel>X</AlertDialogCancel>
              </div>
              <AlertDialogTitle className="text-custom-title font-bold dark:text-white">
                ¿Estás seguro que deseas crear este evento?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-custom-title font-semibold dark:text-white">
                Debes estar seguro de realizar esta acción.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="w-full flex items-center justify-center">
              <FormEventos
                check={check}
                setCheck={setCheck}
                showDialog={showDialog}
                setShowDialog={setShowDialog}
              />
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      {loading ? (
        <SkeletonTable />
      ) : error ? (
        <div className="block mb-20">
          <div className="flex justify-center mt-10">
            <Image
              src="proyectos_manager.svg"
              alt="NotFound"
              width={500}
              height={500}
            />
          </div>
          <div className="mt-5">
            <p className="text-center font-bold text-custom-title text-2xl dark:text-white">
              No se encontraron eventos.
            </p>
          </div>
        </div>
      ) : (
        result && (
          <TableEventosManager
            result={result}
            check={check}
            setCheck={setCheck}
          />
        )
      )}
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
};

export default ManagerEventos;
