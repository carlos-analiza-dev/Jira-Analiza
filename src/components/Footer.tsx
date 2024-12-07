import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-white grid grid-cols-2 mt-4 sm:mt-0 sm:grid-cols-4 p-4 sm:p-12 ">
      <div className="">
        <p className="text-custom-title dark:text-white font-bold block">
          Redes Sociales
        </p>
        <div className="flex justify-start gap-2 mt-2">
          <Link href="https://www.instagram.com/analiza.hn/" target="_blank">
            <Instagram className="text-custom-title dark:text-white" />
          </Link>
          <Link
            href="https://www.facebook.com/analizahn/?locale=es_LA"
            target="_blank"
          >
            <Facebook className="text-custom-title dark:text-white" />
          </Link>
        </div>
      </div>
      <div className="">
        <p className="text-custom-title dark:text-white font-bold ">
          Encuentranos
        </p>
        <div className="mt-2">
          <Link
            href="https://linktr.ee/lab.analiza"
            target="_blank"
            className="text-custom-title dark:text-white font-medium hover:underline block"
          >
            Honduras
          </Link>
          <Link
            href="https://linktr.ee/lab.analiza"
            target="_blank"
            className="text-custom-title dark:text-white font-medium hover:underline block"
          >
            El Salvador
          </Link>
          <Link
            href="https://linktr.ee/lab.analiza"
            target="_blank"
            className="text-custom-title dark:text-white font-medium hover:underline block"
          >
            Guatemala
          </Link>
        </div>
      </div>
      <div className="">
        <p className="text-custom-title dark:text-white font-bold ">
          Contactos
        </p>
        <div className="mt-2">
          <p className="text-custom-title dark:text-white font-medium">
            2276-1800
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
