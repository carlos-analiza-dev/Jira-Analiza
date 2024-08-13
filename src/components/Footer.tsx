import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-white grid grid-cols-2 sm:grid-cols-4 p-4 sm:p-12 ">
      <div className="">
        <p className="text-custom-title dark:text-white font-bold block">
          Redes Sociales
        </p>
        <div className="flex justify-start gap-2 mt-2">
          <Link href="/">
            <Instagram className="text-custom-title dark:text-white" />
          </Link>
          <Link href="/">
            <Facebook className="text-custom-title dark:text-white" />
          </Link>
          <Link href="/">
            <Twitter className="text-custom-title dark:text-white" />
          </Link>
        </div>
      </div>
      <div className="">
        <p className="text-custom-title dark:text-white font-bold ">
          Sucursales
        </p>
        <div className="mt-2">
          <li className="text-custom-title dark:text-white font-medium">
            Francisco Morazan
          </li>
          <li className="text-custom-title dark:text-white font-medium">
            Tegucigalpa
          </li>
          <li className="text-custom-title dark:text-white font-medium">
            San Pedro Sula
          </li>
        </div>
      </div>
      <div className="">
        <p className="text-custom-title dark:text-white font-bold ">
          Contactos
        </p>
        <div className="mt-2">
          <p className="text-custom-title dark:text-white font-medium">
            +504 8878-9909
          </p>
          <p className="text-custom-title dark:text-white font-medium">
            +504 9978-9909
          </p>
          <p className="text-custom-title dark:text-white font-medium">
            +504 9978-9900
          </p>
        </div>
      </div>
      <div className="">
        <p className="text-custom-title dark:text-white font-bold ">
          Derechos Reservados
        </p>
        <span className="block text-sm text-custom-title dark:text-white mt-2">
          &copy; 2024 <Link href="#">Analiza Laboratorios.</Link> Todos los
          derechos reservados
        </span>
      </div>
    </footer>
  );
}
