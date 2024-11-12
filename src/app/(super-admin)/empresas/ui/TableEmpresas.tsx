import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DataEmpresa, ResponseEmpresas } from "@/types/empresa.type";
import { Frown, Pencil, Trash2 } from "lucide-react";
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
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import deleteEmpresa from "@/api/empresas/deleteEmpresa";
import { useSelector } from "react-redux";
import Image from "next/image";
import FormEmpresas from "./FormEmpresas";

interface Props {
  result: ResponseEmpresas;
  check: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}

const TableEmpresas = ({ result, check, setCheck, onClose }: Props) => {
  const user = useSelector((state: any) => state.auth);
  const [empresas, setEmpresas] = useState<DataEmpresa[] | []>([]);
  const [isEdit, setIsEdit] = useState<DataEmpresa | null>(null);
  const { toast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (result && result.empresas) {
      setEmpresas(result.empresas);
    }
  }, [result]);

  const handleDeleteEmpresa = async (id: string) => {
    try {
      const response = await deleteEmpresa(id, user.token);

      setEmpresas((prevEmpresas) =>
        prevEmpresas.filter((empresa) => empresa.id !== id)
      );
      toast({
        title: "Empresa eliminada exitosamente.",
      });
    } catch (error: any) {
      toast({
        title: "Ocurrio un error al momento de eliminar la empresa.",
        variant: "destructive",
      });
    }
  };

  if (!empresas || empresas.length === 0) {
    return (
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
    );
  }

  return (
    <div>
      <Table>
        <TableCaption className="text-center text-custom-title dark:text-white font-bold">
          Listado de empresas
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center text-custom-title dark:text-white font-bold">
              Nombre
            </TableHead>
            <TableHead className="text-center text-custom-title dark:text-white font-bold">
              Descripción
            </TableHead>
            <TableHead className="text-center text-custom-title dark:text-white font-bold">
              Estado
            </TableHead>
            <TableHead className="text-center text-custom-title dark:text-white font-bold">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {empresas?.map((empresa: DataEmpresa, index) => (
            <TableRow key={index}>
              <TableCell className="text-center text-custom-title dark:text-white font-medium">
                {empresa.nombre}
              </TableCell>
              <TableCell className="text-center text-custom-title dark:text-white font-medium">
                {empresa.descripcion}
              </TableCell>
              <TableCell className="text-center text-custom-title dark:text-white font-medium">
                {empresa.estado}
              </TableCell>
              <TableCell className="text-center text-custom-title dark:text-white font-medium">
                <div className="flex justify-around gap-2">
                  <div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Trash2 className="cursor-pointer" />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-custom-title dark:text-white font-bold">
                            ¿Estas seguro de eliminar esta empresa?
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-custom-title dark:text-white font-medium">
                            Una vez elimines la empresa no podras revertirlo
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteEmpresa(empresa.id)}
                            className="bg-custom-title dark:bg-white text-white dark:text-custom-title font-semibold"
                          >
                            Continuar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  <div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Pencil
                          onClick={() => {
                            setIsEdit(empresa), setIsModalOpen(true);
                          }}
                          className="cursor-pointer"
                        />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <div className="flex justify-end">
                          <AlertDialogCancel onClick={() => setIsEdit(null)}>
                            X
                          </AlertDialogCancel>
                        </div>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-custom-title dark:text-white font-bold">
                            ¿Estas seguro de editar esta empresa?
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <div className="w-full">
                            <FormEmpresas
                              check={check}
                              setCheck={setCheck}
                              onClose={handleCloseModal}
                              isEdit={isEdit}
                            />
                          </div>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableEmpresas;
