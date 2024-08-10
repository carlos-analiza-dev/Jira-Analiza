import LoginSesion from "@/components/Login";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-5 sm:w-full">
        <div className="grid-cols-1 sm:max-w-2xl flex justify-center">
          <div className="h-full w-full">
            <Image
              src="/images/Logotipo_principal.png"
              alt="LogoAnaliza"
              width={600}
              height={500}
            />
          </div>
        </div>
        <div className="block justify-center">
          <p className="text-3xl text-custom-title font-bold text-center">
            Inicia Sesión
          </p>
          <LoginSesion />
          <div className="mt-8 flex justify-between w-full">
            <Link
              className="text-custom-title hover:underline hover:text-sky-700 font-semibold"
              href="/"
            >
              ¿Olvidasate tu Contraseña?
            </Link>
            <Link
              className="text-custom-title hover:underline hover:text-sky-700 font-semibold"
              href="/"
            >
              ¿No tienes una cuenta?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
