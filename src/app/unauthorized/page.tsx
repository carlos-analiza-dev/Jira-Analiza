import Image from "next/image";
import Link from "next/link";
import React from "react";

const Unauthorized = () => {
  return (
    <div className="px-14 py-16 max-w-3xl sm:max-w-full sm:px-20 sm:py-20 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="w-full flex justify-center">
        <Image
          src="/images/no_autorizado.png"
          alt="no-acces"
          width={500}
          height={600}
        />
      </div>
      <div className="sm:px-12  flex flex-col justify-center">
        <p className="text-custom-title dark:text-white font-bold text-base sm:text-2xl">
          Upssssss! lo sentimos, no estas autorizado para ingresar a este sitio.
        </p>
        <div className="w-full text-center mt-5">
          <Link
            href="/"
            className="text-custom-title dark:text-white font-bold text-base sm:text-xl hover:underline"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
