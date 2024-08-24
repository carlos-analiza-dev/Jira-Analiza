"use client";
import useAllUsers from "@/api/getAllUsers";
import { ResponseData } from "@/types/response.type";
import TableUsers from "./ui/TableUsers";
import SkeletonTable from "@/components/SkeletonTable";
import { useState } from "react";

export default function UsersPage() {
  const [check, setCheck] = useState(true);
  const { result, loading }: ResponseData = useAllUsers(check);

  return (
    <div className="max-w-3xl sm:max-w-5xl p-3">
      <div className="mt-5 text-center mb-5">
        <p className="text-3xl font-semibold text-custom-title dark:text-white">
          Usuarios
        </p>
      </div>
      {loading ? (
        <SkeletonTable />
      ) : (
        <TableUsers users={result} check={check} setCheck={setCheck} />
      )}
    </div>
  );
}
