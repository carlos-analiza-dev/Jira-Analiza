import Image from "next/image";
import Link from "next/link";
import FormResetPassword from "./ui/FormResetPassword";

export default function ResetPassword() {
  return (
    <div className="h-full sm:h-screen w-screen flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-5 sm:w-full">
        <div className="grid-cols-1 sm:max-w-2xl flex justify-center">
          <div className="h-full w-full">
            <Image
              src="/images/Logotipo_principal.png"
              alt="LogoAnaliza"
              layout="responsive"
              width={600}
              height={500}
              className="object-contain"
            />
          </div>
        </div>
        <div className="block justify-center">
          <p className="text-3xl text-custom-title font-bold text-center">
            Restablecer Contraseña
          </p>
          <FormResetPassword />
          <div className="mt-8 flex justify-between w-full">
            <Link
              className="text-custom-title hover:underline hover:text-sky-700 font-semibold"
              href="/register"
            >
              ¿No tienes una cuenta? Registrate
            </Link>
            <Link
              className="text-custom-title hover:underline hover:text-sky-700 font-semibold"
              href="/"
            >
              ¿Ya tienes una cuenta? Iniciar Sesion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
