"use client";
import Image from "next/image";
import Link from "next/link";
import MenuMobile from "./MenuMobile";
import ModeToggle from "./ModeToggle";
import { Button } from "./ui/button";
import { clearUser } from "@/store/auth/sessionSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut, User } from "lucide-react";

export default function NavBar() {
  const user = useSelector((state: any) => state.auth);
  console.log("User desde NavBar", user);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(clearUser());
    router.push("/");
  };

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
      {!user?.role && !user?.token ? (
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
      ) : (
        <div className="sm:flex gap-3 hidden">
          <div className="hidden sm:block">
            <ModeToggle />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Avatar>
                <AvatarImage
                  width={100}
                  height={100}
                  src="/images/perfil.png"
                  alt="perfilPhoto"
                />
                <AvatarFallback className="text-custom-title dark:text-white">
                  {user?.nombre ? user?.nombre[0] : "?"}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <Link
                className="flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-800 p-2 text-custom-title dark:text-white"
                href="/perfil"
              >
                Perfil <User />
              </Link>
              <p
                onClick={handleLogout}
                className="flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2 text-custom-title dark:text-white"
              >
                Cerrar Sesion <LogOut />
              </p>
            </PopoverContent>
          </Popover>
        </div>
      )}
      <div className="sm:hidden flex gap-4 items-center">
        {user && user.role && user.token && <ModeToggle />}
        <MenuMobile />
      </div>
    </div>
  );
}
