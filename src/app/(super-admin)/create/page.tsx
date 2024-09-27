"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "@/store/auth/sessionSlice";
import FormCreateProject from "@/components/FormCreateProject";

const CrearProyecto = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: any) => state.auth);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    if (!hasCheckedAuth) {
      if (!user || !user.rol || !user.token) {
        dispatch(clearUser());
        router.push("/unauthorized");
      }
      setHasCheckedAuth(true);
    }
  }, [user, dispatch, router, hasCheckedAuth]);

  return (
    <div className="max-w-2xl sm:max-w-5xl mx-auto">
      <div className="mt-4">
        <h1 className="text-3xl font-bold text-custom-title dark:text-white">
          Crear Proyecto
        </h1>
        <h2 className="text-lg font-medium text-custom-title dark:text-white mt-2">
          Llena el siguiente formulario para crear un proyecto.
        </h2>
      </div>
      <div className="mt-5">
        <Link
          href="/admin-proyectos"
          className="py-3 px-5 bg-custom-title text-white shadow-md rounded-md dark:bg-white dark:text-custom-title font-bold"
        >
          Volver a proyectos
        </Link>
      </div>
      <div className="flex justify-center mt-8">
        <FormCreateProject />
      </div>
    </div>
  );
};

export default CrearProyecto;
