"use client";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const PerfilUser = () => {
  const user = useSelector((state: any) => state.auth);
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="relative">
          <Image
            src="/images/perfil.png"
            alt="Imagen Perfil"
            width={300}
            height={300}
            className="rounded-full"
          />
        </div>
      </div>
      <div className="mt-5 text-center ">
        <p className="font-bold text-custom-title dark:text-white">
          Nombre: <span className="font-medium">{user.nombre}</span>
        </p>
        <p className="font-bold text-custom-title dark:text-white mt-2">
          Correo: <span className="font-medium">{user.correo}</span>
        </p>
        <p className="font-bold text-custom-title dark:text-white mt-2">
          DNI: <span className="font-medium">{user.dni}</span>
        </p>
      </div>
    </>
  );
};

export default PerfilUser;
