"use client";
import { getEventos } from "@/api/eventos/getEventos";
import Eventos from "@/components/Eventos";
import ModalExpired from "@/components/ModalExpired";
import SkeletonProyectos from "@/components/SkeletonProyectos";
import { clearUser } from "@/store/auth/sessionSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const EventosUsersPage = () => {
  const user = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [check, setCheck] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const fetchEventos = async () => {
      setLoading(true);
      try {
        const eventos = await getEventos(user.token);
        setResult(eventos);
        setError("");
      } catch (err) {
        setError("Error al cargar los eventos");
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, [user.token, check]);

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

  return (
    <div className="w-full px-5 py-4 md:px-16 md:py-12">
      <div className="mt-4">
        <h1 className="text-3xl font-bold text-custom-title dark:text-white">
          Mis Eventos
        </h1>
        <h2 className="text-lg font-medium text-custom-title dark:text-white mt-2">
          Maneja y administra tus eventos.
        </h2>
      </div>

      <div className="mt-5 max-h-[500px] overflow-y-scroll">
        {loading ? (
          <SkeletonProyectos />
        ) : (
          <Eventos result={result} check={check} setCheck={setCheck} />
        )}
      </div>
      {showModal && <ModalExpired handleCloseModal={handleCloseModal} />}
    </div>
  );
};

export default EventosUsersPage;
