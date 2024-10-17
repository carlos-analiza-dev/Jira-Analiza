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
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import SkeletonTable from "@/components/SkeletonTable";
import { getEventos } from "@/api/getEventos";

import { useDispatch } from "react-redux";
import { clearUser } from "@/store/auth/sessionSlice";
import { useRouter } from "next/navigation";
import Eventos from "@/components/Eventos";
import FormEventos from "@/components/FormEventos";

export const dynamic = "force-dynamic";

export default function EventosPage() {
  const [check, setCheck] = useState<boolean>(true);
  const user = useSelector((state: any) => state.auth);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const fetchEventos = async () => {
      setLoading(true);
      try {
        const eventos = await getEventos(user.token);
        setResult(eventos);
        setError("");
      } catch (err: any) {
        setError(err.message || "Ocurrió un error en la petición");
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, [user.token, check]);

  console.log("EVENTOS ADMIN", result);
  console.log("error eventos");

  useEffect(() => {
    if (error === "Request failed with status code 401") {
      dispatch(clearUser());
      router.push("/");
    }
  }, [error, dispatch, router]);

  console.log("eventos", result);

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
      <div className="flex justify-end mt-5 gap-3">
        <div>
          <AlertDialog
            open={showDialog}
            onOpenChange={() => setShowDialog(!showDialog)}
          >
            <AlertDialogTrigger asChild>
              <Button className="bg-custom-title dark:bg-white text-white dark:text-custom-title font-semibold">
                Agregar Evento
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
                  En este apartado podras agregar eventos los cuales seran
                  vistos por todos los integrantes.
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
      </div>
      <div className="mt-5 max-h-[500px] overflow-y-scroll">
        {loading ? (
          <SkeletonTable />
        ) : error ? (
          <div className="flex justify-center">
            <p className="text-red-500 text-3xl font-bold mt-10">
              No se encontraron eventos
            </p>
          </div>
        ) : (
          <Eventos check={check} setCheck={setCheck} result={result} />
        )}
      </div>
    </div>
  );
}
