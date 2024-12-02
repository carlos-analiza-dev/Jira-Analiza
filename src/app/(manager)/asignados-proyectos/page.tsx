"use client";
import useAllProjects from "@/api/proyectos/getAllProjects";
import ModalExpired from "@/components/ModalExpired";
import Proyectos from "@/components/Proyectos";
import SkeletonProyectos from "@/components/SkeletonProyectos";
import { clearUser } from "@/store/auth/sessionSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const ProyectosManagerAsignados = () => {
  const user = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [check, setCheck] = useState(false);
  const { result, error, loading } = useAllProjects(user.token, check);

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

  return (
    <div className="mx-auto px-4 md:px-12">
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
          <Proyectos setCheck={setCheck} check={check} proyectos={result} />
        )}
      </div>
      {showModal && <ModalExpired handleCloseModal={handleCloseModal} />}
    </div>
  );
};

export default ProyectosManagerAsignados;
