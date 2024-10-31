"use client";
import TableEmpresas from "./ui/TableEmpresas";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import FormEmpresas from "./ui/FormEmpresas";
import useGetAllEmpresas from "@/api/empresas/getAllEmpresas";
import { useSelector } from "react-redux";
import SkeletonProyectos from "@/components/SkeletonProyectos";
import Image from "next/image";
import { Frown } from "lucide-react";
import { useEffect, useState } from "react";

const EmpresasPage = () => {
  const user = useSelector((state: any) => state.auth);
  const [check, setCheck] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { result, error, loading } = useGetAllEmpresas(
    user.token,
    check,
    offset,
    limit
  );

  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (result?.total) {
      setTotalPages(Math.ceil(result.total / limit));
    }
  }, [result, limit]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setOffset((page - 1) * limit);
  };

  return (
    <div className="mx-auto px-4 md:px-12">
      <div className="mt-5 mb-4 flex justify-center">
        <h1 className="text-2xl text-custom-title dark:text-white font-bold">
          Empresas Analiza
        </h1>
      </div>
      <div className="mt-2 mb-2 flex justify-between gap-3 items-center">
        <h3 className="text-base sm:text-xl text-custom-title dark:text-white font-medium">
          Gestiona las empresas de Laboratorios Centroamericanos Honduras.
        </h3>

        <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <AlertDialogTrigger asChild>
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="outline"
              className="bg-custom-title text-white dark:bg-white dark:text-custom-title font-semibold"
            >
              Agregar Empresa
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <div className="flex justify-end">
              <AlertDialogCancel>X</AlertDialogCancel>
            </div>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-custom-title dark:text-white">
                ¿Estas seguro de agregar una nueva empresa?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-custom-title dark:text-white">
                Aqui puedes agregar una nueva empresa.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <FormEmpresas
              onClose={handleCloseModal}
              check={check}
              setCheck={setCheck}
            />
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div>
        {loading ? (
          <SkeletonProyectos />
        ) : error ? (
          <div className="mt-10">
            <div className="flex justify-center ">
              <Image src="empresa.svg" width={300} height={300} alt="Empresa" />
            </div>
            <div className="mt-5 flex justify-center items-center gap-4">
              <h3 className="text-red-500  sm:text-lg font-semibold">
                No se encontraron empresas disponibles en este momento
              </h3>
              <Frown size={25} className="text-red-500" />
            </div>
          </div>
        ) : (
          result && (
            <TableEmpresas
              result={result}
              check={check}
              setCheck={setCheck}
              onClose={handleCloseModal}
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
};

export default EmpresasPage;
