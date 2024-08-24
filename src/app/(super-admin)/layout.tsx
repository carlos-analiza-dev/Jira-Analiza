"use client";
import SideBar from "@/components/SideBar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function AdminLayout({ children }: any) {
  const router = useRouter();
  const user = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (
      !user ||
      !user.role ||
      user.role.nombre !== "Administrador" ||
      !user.token
    ) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="h-full">
      <div className="mt-10 md:mt-16 w-full block md:flex">
        <div className="w-full md:w-1/4">
          <SideBar />
        </div>
        <main className="mt-5 p-2 md:w-3/4">{children}</main>
      </div>
    </div>
  );
}
