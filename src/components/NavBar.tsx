import Image from "next/image";
import Link from "next/link";
import MenuMobile from "./MenuMobile";
import ModeToggle from "./ModeToggle";

export default function NavBar() {
  return (
    <div className="flex items-center justify-between p-2 mx-auto cursor-pointer sm:max-w-4xl md:max-w-6xl">
      <Link href="/">
        <Image
          src="/images/Logotipo_principal.png"
          width={200}
          height={200}
          alt="Logo Analiza"
          className="h-20 w-20"
        />
      </Link>
      <div className="hidden sm:block">
        <ModeToggle />
      </div>
      <div className="justify-between gap-2 hidden sm:flex">
        <Link
          className="text-custom-title dark:text-white font-light text-base hover:text-sky-900 hover:underline"
          href="/"
        >
          Iniciar Sesion
        </Link>
        <p className="text-custom-title dark:text-white">|</p>
        <Link
          className="text-custom-title dark:text-white font-light text-base hover:text-sky-900 hover:underline"
          href="register"
        >
          Registrarse
        </Link>
      </div>
      <div className="sm:hidden flex gap-4">
        <ModeToggle />
        <MenuMobile />
      </div>
    </div>
  );
}
