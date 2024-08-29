"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function UserLayout({ children }: any) {
  const router = useRouter();
  const user = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (!user || !user.role || !user.role.nombre || !user.token) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="h-full">
      <div className="mt-10 md:mt-16 w-full block md:flex">
        <main className="mt-5 p-2 w-full h-screen">{children}</main>
      </div>
    </div>
  );
}
