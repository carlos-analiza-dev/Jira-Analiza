"use client";
import useAllProjects from "@/api/getAllProjects";
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
  console.log("USERRR", user);

  const dispatch = useDispatch();
  const router = useRouter();
  const [check, setCheck] = useState(false);
  const { result, error, loading } = useAllProjects(user.token, check);
  const [proyectos, setProyectos] = useState<TypeProyectos[] | []>([]);

  useEffect(() => {
    if (result) {
      setProyectos(result);
    }
  }, [result, user.token]);

  useEffect(() => {
    if (error === "Request failed with status code 401") {
      dispatch(clearUser());
      router.push("/");
    }
  }, [error, dispatch, router]);
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
    </div>
  );
};

export default ProyectosPage;
