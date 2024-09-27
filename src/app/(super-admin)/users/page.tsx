"use client";
import useAllUsers from "@/api/getAllUsers";
import { ResponseData } from "@/types/response.type";
import TableUsers from "./ui/TableUsers";
import SkeletonTable from "@/components/SkeletonTable";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { clearUser } from "@/store/auth/sessionSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function UsersPage() {
  const user = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();
  const router = useRouter();

  const [check, setCheck] = useState(true);
  const { result, loading, error }: ResponseData = useAllUsers(
    check,
    user.token
  );

  useEffect(() => {
    if (error === "Request failed with status code 401") {
      dispatch(clearUser());
      router.push("/unauthorized");
    }
  }, [error, dispatch, router]);

  return (
    <div className="mx-auto px-4 md:px-12">
      <div className="mt-5 text-center mb-5">
        <p className="text-3xl font-semibold text-custom-title dark:text-white">
          Usuarios
        </p>
      </div>
      {loading ? (
        <SkeletonTable />
      ) : (
        <div className="px-3 mx-auto">
          <TableUsers users={result} check={check} setCheck={setCheck} />
        </div>
      )}
    </div>
  );
}
