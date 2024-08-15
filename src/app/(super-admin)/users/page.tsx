"use client";
import useAllUsers from "@/api/getAllUsers";
import { ResponseData } from "@/types/response.type";
import TableUsers from "./ui/TableUsers";
import SkeletonTableUsers from "./ui/SkeletonTableUsers";

export default function UsersPage() {
  const { result, loading }: ResponseData = useAllUsers();

  return (
    <div className="max-w-3xl sm:max-w-5xl p-3">
      <div className="mt-5 text-center mb-5">
        <p className="text-3xl font-semibold text-custom-title dark:text-white">
          Usuarios
        </p>
      </div>
      {loading ? <SkeletonTableUsers /> : <TableUsers users={result} />}
    </div>
  );
}
