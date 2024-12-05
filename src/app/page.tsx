"use client";
import LoginSesion from "@/components/Login";
import Spinner from "@/components/Spinner";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className=" h-full md:h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
      {isLoading && (
        <div className="h-full w-full">
          <Spinner />
        </div>
      )}

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 sm:w-full ${isLoading ? "opacity-80" : ""}`}
      >
        <div className="grid-cols-1 sm:w-full flex justify-center">
          <div className="h-full w-full flex flex-col items-center justify-center">
            <Image
              src="/images/analiza_todos.png"
              alt="LogoAnaliza"
              width={600}
              height={500}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center px-4">
          <p className="text-3xl text-custom-title dark:text-white font-bold text-center">
            Inicia Sesión
          </p>
          <LoginSesion setIsLoading={setIsLoading} />
          <div className="mt-8 flex justify-between w-full">
            <Link
              className="text-custom-title dark:text-white hover:underline hover:text-sky-700 font-semibold"
              href="/reset-password"
            >
              ¿Olvidaste tu Contraseña?
            </Link>
            <Link
              className="text-custom-title dark:text-white hover:underline hover:text-sky-700 font-semibold"
              href="/register"
            >
              ¿No tienes una cuenta? Regístrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
