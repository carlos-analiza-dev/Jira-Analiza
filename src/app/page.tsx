import LoginSesion from "@/components/Login";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-900 p-5 sm:w-full">
        <div className="grid-cols-1 sm:w-full flex justify-center">
          <div className="h-full w-full flex flex-col items-center justify-center">
            <Image
              src="/images/Logotipo_principal.png"
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
          <LoginSesion />
          <div className="mt-8 flex justify-between w-full">
            <Link
              className="text-custom-title dark:text-white hover:underline hover:text-sky-700 font-semibold"
              href="/reset-password"
            >
              ¿Olvidasate tu Contraseña?
            </Link>
            <Link
              className="text-custom-title dark:text-white hover:underline hover:text-sky-700 font-semibold"
              href="/register"
            >
              ¿No tienes una cuenta? Registrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
