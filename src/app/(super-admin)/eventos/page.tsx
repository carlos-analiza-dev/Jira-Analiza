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
import { Button } from "@/components/ui/button";
import FormEventos from "./ui/FormEventos";
import TableEventos from "@/app/register/ui/TableEventos";

export default function EventosPage() {
  return (
    <div className="mx-auto px-4 md:px-12">
      <div className="mt-3 flex justify-center">
        <h1 className="text-custom-title dark:text-white font-bold text-3xl">
          Eventos
        </h1>
      </div>
      <div className="mt-5">
        <h3 className="text-xl text-custom-title dark:text-white font-semibold">
          Aqui puedes agregar eventos que se realizaran.
        </h3>
      </div>
      <div className="flex justify-end mt-3">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="bg-custom-title dark:bg-white text-white dark:text-custom-title font-semibold">
              Agregar
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <div className="flex justify-end">
              <AlertDialogCancel>X</AlertDialogCancel>
            </div>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-custom-title dark:text-white font-bold">
                Agregar nuevo evento
              </AlertDialogTitle>
              <AlertDialogDescription className="text-custom-title dark:text-white font-semibold">
                En este apartado podras agregar eventos los cuales seran visto
                por todos los integrantes.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="mt-2">
              <FormEventos />
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="mt-4 mx-auto">
        <TableEventos />
      </div>
    </div>
  );
}
