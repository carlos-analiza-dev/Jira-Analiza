import { TableRolesData } from "@/types/table.roles.type";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import deleteRol from "@/api/deleteRol";
import useAllRoles from "@/api/getAllRoles";
import { useToast } from "@/components/ui/use-toast";

export interface Props {
  roles: TableRolesData[];
  check: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
}

const TableRoles = ({ roles, check, setCheck }: Props) => {
  const { toast } = useToast();
  const { result: allRoles } = useAllRoles(check);

  const handleDelete = async (id: string) => {
    try {
      await deleteRol(id);
      setCheck(!check);
      toast({ title: "Rol eliminado exitosamente" });
    } catch (error) {
      console.error("Failed to delete role:", error);
      toast({ title: "No se pudo eliminar este rol", variant: "destructive" });
    }
  };

  if (!allRoles || allRoles.length === 0) {
    return (
      <div className="flex justify-center mt-5">
        <p className="text-3xl font-bold text-custom-title dark:text-white">
          No se encontraron roles en la base de datos
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableCaption className="text-custom-title dark:text-white">
        Lista de roles
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center text-custom-title dark:text-white">
            Numero de rol
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white">
            Nombre
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white">
            Acciones
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allRoles.map((rol: TableRolesData) => (
          <TableRow key={rol.id}>
            <TableCell className="font-medium text-center">{rol.id}</TableCell>
            <TableCell className="text-center">{rol.nombre}</TableCell>
            <TableCell className="text-center">
              <div className="flex justify-around gap-3 sm:gap-0">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="bg-custom-title text-white dark:bg-white dark:text-custom-title">
                      <Trash2 size={15} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-custom-title dark:text-white">
                        ¿Estas seguro de eliminar este rol?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="text-custom-title dark:text-white">
                        Cancelar
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(rol.id)}
                        className="bg-custom-title text-white dark:bg-white dark:text-custom-title"
                      >
                        Continuar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button className="bg-custom-title text-white dark:bg-white dark:text-custom-title">
                  <Pencil size={15} />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableRoles;
