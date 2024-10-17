"use client";
import { Input } from "@/components/ui/input";
import { clearUser } from "@/store/auth/sessionSlice";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const PerfilPage = () => {
  const user = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!user || !user.rol || !user.token) {
      dispatch(clearUser());
      router.push("/");
    }
  }, [dispatch, router, user.token]);

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="relative">
          <Image
            src="/images/perfil.png"
            alt="Imagen Perfil"
            width={300}
            height={300}
            className="rounded-full"
          />
        </div>
      </div>
      <div className="mt-5 text-center ">
        <p className="font-bold text-custom-title dark:text-white">
          Nombre: <span className="font-medium">{user.nombre}</span>
        </p>
        <p className="font-bold text-custom-title dark:text-white mt-2">
          Correo: <span className="font-medium">{user.correo}</span>
        </p>
        <p className="font-bold text-custom-title dark:text-white mt-2">
          DNI: <span className="font-medium">{user.dni}</span>
        </p>
      </div>
    </>
  );
};

export default PerfilPage;
