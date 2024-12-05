"use client";
import { getEventos } from "@/api/eventos/getEventos";
import Eventos from "@/components/Eventos";
import FormEventos from "@/components/FormEventos";
import ModalExpired from "@/components/ModalExpired";
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
import { clearUser } from "@/store/auth/sessionSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const EventosPage = () => {
  const [check, setCheck] = useState<boolean>(true);
  const user = useSelector((state: any) => state.auth);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
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

      <div className="mt-5 max-h-[500px] overflow-y-scroll">
        {loading ? (
          <SkeletonTable />
        ) : error ? (
          <div className="block mb-20">
            <div className="flex justify-center mt-10">
              <Image
                src="eventos.svg"
                alt="NotFound"
                width={500}
                height={500}
              />
            </div>
            <div className="mt-5">
              <p className="text-center font-bold text-custom-title text-2xl dark:text-white">
                No se encontraron eventos disponibles.
              </p>
            </div>
          </div>
        ) : (
          <Eventos check={check} setCheck={setCheck} result={result} />
        )}
      </div>
      {showModal && <ModalExpired handleCloseModal={handleCloseModal} />}
    </div>
  );
};

export default EventosPage;
