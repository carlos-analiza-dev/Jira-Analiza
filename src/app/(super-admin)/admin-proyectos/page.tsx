"use client";
import useAllProjects from "@/api/getAllProjects";
import Link from "next/link";
import React from "react";
import Proyectos from "./ui/Proyectos";
import SkeletonProyectos from "@/components/SkeletonProyectos";
import { useSelector } from "react-redux";

const ProyectosPage = () => {
  const user = useSelector((state: any) => state.auth);
  const { result, error, loading } = useAllProjects(user.token);
  console.log("RESULT", result);

  return (
    <div className="max-w-2xl sm:max-w-5xl mx-auto">
      <div className="mt-4">
        <h1 className="text-3xl font-bold text-custom-title dark:text-white">
          Mis Proyectos
        </h1>
        <h2 className="text-lg font-medium text-custom-title dark:text-white mt-2">
          Maneja y administra tus proyectos.
        </h2>
      </div>
      <div className="mt-5">
        <Link
          href="/admin-proyectos/create"
          className="py-3 px-5 bg-custom-title text-white shadow-md rounded-md dark:bg-white dark:text-custom-title font-bold"
        >
          Nuevo Proyecto
        </Link>
        {loading ? <SkeletonProyectos /> : <Proyectos result={result} />}
      </div>
    </div>
  );
};

export default ProyectosPage;
