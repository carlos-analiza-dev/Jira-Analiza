import Image from "next/image";
import Link from "next/link";
import React from "react";

const Unauthorized = () => {
  return (
    <div className="px-14 py-16 max-w-3xl sm:max-w-full sm:px-20 sm:py-20">
      <div className="h-full w-full flex justify-center">
        <Image src="/no_acces.svg" alt="no-acces" width={500} height={600} />
      </div>
      <div className="mt-5 flex justify-center w-full">
        <p className="text-custom-title dark:text-white font-bold text-base sm:text-2xl">
          Upssssss! lo sentimos, no estas autorizado para ingresar a este sitio.
        </p>
      </div>
      <div className="mt-5 flex justify-center w-full">
        <Link
          href="/"
          className="text-custom-title dark:text-white font-bold text-base sm:text-xl hover:underline"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
