"use client";
import SkeletonTable from "@/components/SkeletonTable";
import TableAuth from "./ui/TableAuth";
import useGetUserAuth from "@/api/getUserAuth";
import { ResponseData } from "@/types/response.type";
import { useState } from "react";

const AutorizarPage = () => {
  const [check, setCheck] = useState(true);
  const { loading, result }: ResponseData = useGetUserAuth(check);
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
        <TableAuth users={result} check={check} setCheck={setCheck} />
      )}
    </div>
  );
};

export default AutorizarPage;
