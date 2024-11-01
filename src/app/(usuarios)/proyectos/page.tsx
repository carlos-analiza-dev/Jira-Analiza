"use client";
import useAllProjects from "@/api/proyectos/getAllProjects";
import ModalExpired from "@/components/ModalExpired";
import Proyectos from "@/components/Proyectos";
import SkeletonProyectos from "@/components/SkeletonProyectos";
import { clearUser } from "@/store/auth/sessionSlice";
import { TypeProyectos } from "@/types/proyectos.type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const ProyectosPage = () => {
  const user = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();
  const router = useRouter();
  const [check, setCheck] = useState(false);
  const { result, error, loading } = useAllProjects(user.token, check);
  const [proyectos, setProyectos] = useState<TypeProyectos[] | []>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (result) {
      setProyectos(result);
    }
  }, [result, user.token]);

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
    <div className="w-full px-5 py-4 md:px-16 md:py-12">
      <div className="mt-4">
        <h1 className="text-3xl font-bold text-custom-title dark:text-white">
          Mis Proyectos
        </h1>
        <h2 className="text-lg font-medium text-custom-title dark:text-white mt-2">
          Maneja y administra tus proyectos.
        </h2>
      </div>
      <div className="mt-5 max-h-[500px] overflow-y-scroll">
        {loading ? (
          <SkeletonProyectos />
        ) : (
          <Proyectos proyectos={proyectos} check={check} setCheck={setCheck} />
        )}
      </div>
      {showModal && <ModalExpired handleCloseModal={handleCloseModal} />}
    </div>
  );
};

export default ProyectosPage;
