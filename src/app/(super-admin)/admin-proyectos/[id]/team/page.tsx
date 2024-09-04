"use client";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const TeamPage = () => {
  const router = useRouter();
  const params = useParams();
  console.log("PARAMS", params.id);

  return (
    <div className="max-w-3xl sm:max-w-6xl px-4">
      <div className="mt-5">
        <h1 className="text-3xl text-custom-title font-bold dark:text-white">
          Administrar Equipos
        </h1>
      </div>
      <div className="mt-3">
        <h3 className="text-xl text-custom-title font-bold dark:text-white">
          Administra el equipo de trabajo para este proyecto.
        </h3>
      </div>
      <div className="mt-3 flex justify-between sm:w-2/6 gap-4">
        <Button className="bg-custom-title dark:bg-white text-white dark:text-custom-title text-base">
          Agregar Colaborador
        </Button>
        <Button
          onClick={() => router.back()}
          className="bg-purple-700 text-white p-2 rounded-md shadow-md dark:bg-purple-700 text-base dark:text-white"
        >
          Volver al proyecto
        </Button>
      </div>
      <div className="mt-5">
        <h1 className="text-2xl text-custom-title font-bold dark:text-white">
          Miembros Actuales
        </h1>
      </div>
      <div className="h-full flex justify-center mx-auto items-center">
        <p>No se encontraron miembros en este equipo.</p>
      </div>
    </div>
  );
};

export default TeamPage;
