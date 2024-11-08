"use client";
import useGetProyectosManager from "@/api/proyectos/getProyectosManager";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TableProyectosManager from "./ui/TableProyectosManager";
import Image from "next/image";
import SkeletonTable from "@/components/SkeletonTable";
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
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import FormCreateProject from "./ui/FormCreateProject";
import { useDispatch } from "react-redux";
import { clearUser } from "@/store/auth/sessionSlice";
import { useRouter } from "next/navigation";
import ModalExpired from "@/components/ModalExpired";

const ProyectosManager = () => {
  const user = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [check, setCheck] = useState(true);
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [estado, setEstado] = useState<string>("");
  const { result, loading, error } = useGetProyectosManager(
    user.token,
    check,
    limit,
    offset,
    estado
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showModal, setShowModal] = useState(false);

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

  useEffect(() => {
    if (result) {
      setTotalPages(Math.ceil(result?.total / limit));
    }
  }, [result, limit]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setOffset((page - 1) * limit);
  };

  const handleEstadoChange = (value: string) => {
    setEstado(value === "all" ? "" : value);
  };

  const handleUpdateSuccess = () => {
    setOpenEditDialog(false);
  };

  return (
    <div className="mx-auto w-full">
      <div className="mt-5 mb-4 flex justify-center w-full">
        <h1 className="text-2xl font-bold text-custom-title dark:text-white ">
          Proyectos Manager
        </h1>
      </div>
      <div className="">
        <h3 className="text-lg font-medium text-custom-title dark:text-white ">
          Gestiona los proyectos de Laboratorios Centroamericanos.
        </h3>
      </div>
      <div className="w-full flex justify-between mt-5">
        <Select onValueChange={handleEstadoChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Estado</SelectLabel>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="En Progreso">En Progreso</SelectItem>
              <SelectItem value="Finalizado">Finalizado</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <AlertDialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
          <AlertDialogTrigger asChild>
            <div className="sm:mx-5">
              <Button className="bg-custom-title dark:bg-white text-white dark:text-custom-title font-semibold ">
                Agregar Proyecto
              </Button>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className="w-full">
            <AlertDialogHeader>
              <div className="flex justify-end">
                <AlertDialogCancel>X</AlertDialogCancel>
              </div>
              <AlertDialogTitle className="text-custom-title font-bold dark:text-white">
                ¿Estás seguro que deseas crear este proyecto?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-custom-title font-semibold dark:text-white">
                Debes estar seguro de realizar esta acción.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="w-full flex items-center justify-center">
              <FormCreateProject
                check={check}
                setCheck={setCheck}
                onSuccess={handleUpdateSuccess}
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
              No se encontraron proyectos.
            </p>
          </div>
        </div>
      ) : (
        result && (
          <TableProyectosManager
            result={result}
            setCheck={setCheck}
            check={check}
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

export default ProyectosManager;
