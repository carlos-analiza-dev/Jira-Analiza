"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "./ui/separator";
import { dataSide } from "../../data/dataSidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
const SideBar = () => {
  const path = usePathname();

  return (
    <div>
      <p className="text-custom-title dark:text-white font-semibold text-lg text-center">
        Bienvenido Administrador
      </p>
      <div className="mt-3 flex justify-center">
        <Avatar>
          <AvatarImage
            width={100}
            height={100}
            src="/images/perfil.png"
            alt="perfilPhoto"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <Separator className="mt-2" />
      <div className="mt-5 mb-5">
        {dataSide.map((item) => (
          <Link
            className={`${item.link === path ? "bg-custom-title text-white dark:bg-gray-700" : ""} flex justify-between w-full dark:hover:shadow dark:hover:bg-gray-800 hover:shadow px-5 py-3 text-custom-title dark:text-white font-semibold`}
            key={item.id}
            href={item.link}
          >
            {item.title}
            <item.icon />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
