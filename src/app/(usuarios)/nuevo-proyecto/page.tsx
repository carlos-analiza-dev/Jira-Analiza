"use client";
import React, { useEffect } from "react";
import FormCreateProjectUsers from "./ui/FormCreateProjectUsers";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearUser } from "@/store/auth/sessionSlice";
import { useRouter } from "next/navigation";

const ProyectoNuevo = () => {
  const user = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (!user.token) {
      dispatch(clearUser());
      router.push("/");
    }
  }, [dispatch, router, user]);
  return (
    <div className="px-4 py-4 sm:px-12">
      <div className="mt-4">
        <h1 className="text-3xl font-bold text-custom-title dark:text-white">
          Crear Proyecto
        </h1>
        <h2 className="text-lg font-medium text-custom-title dark:text-white mt-2">
          Llena el siguiente formulario para crear un proyecto.
        </h2>
      </div>
      <div className="flex items-center justify-center mt-5">
        <FormCreateProjectUsers />
      </div>
    </div>
  );
};

export default ProyectoNuevo;
