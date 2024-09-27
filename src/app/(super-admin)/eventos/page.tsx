"use client";
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
import FormEventos from "./ui/FormEventos";
import { useSelector } from "react-redux";
import useGetEventosByUser from "@/api/getEventos";
import TableEventos from "./ui/TableEventos";
import { useState } from "react";
import SkeletonTable from "@/components/SkeletonTable";

export default function EventosPage() {
  const [check, setCheck] = useState(true);
  const user = useSelector((state: any) => state.auth);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const { result, loading, error } = useGetEventosByUser(user.token, check);

  return (
    <div className="mx-auto px-4 md:px-12">
      <div className="mt-3 flex justify-center">
        <h1 className="text-custom-title dark:text-white font-bold text-3xl">
          Eventos
        </h1>
      </div>
      <div className="mt-5">
        <h3 className="text-xl text-custom-title dark:text-white font-semibold">
          Aqui puedes agregar eventos que se realizaran
        </h3>
      </div>
      <div className="flex justify-end mt-3">
        <AlertDialog
          open={showDialog}
          onOpenChange={() => setShowDialog(!showDialog)}
        >
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
      <div className="mt-8 mx-auto">
        {loading ? (
          <SkeletonTable />
        ) : (
          <TableEventos check={check} setCheck={setCheck} result={result} />
        )}
      </div>
    </div>
  );
}
