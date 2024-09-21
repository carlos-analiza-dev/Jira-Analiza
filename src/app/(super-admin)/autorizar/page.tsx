"use client";
import SkeletonTable from "@/components/SkeletonTable";
import TableAuth from "./ui/TableAuth";
import useGetUserAuth from "@/api/getUserAuth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { clearUser } from "@/store/auth/sessionSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const AutorizarPage = () => {
  const user = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [check, setCheck] = useState(true);
  const { loading, result, error } = useGetUserAuth(check, user.token);
  useEffect(() => {
    if (error === "Request failed with status code 401") {
      dispatch(clearUser());
      router.push("/unauthorized");
    }
  }, [error, dispatch, router]);
  return (
    <div className="max-w-3xl sm:max-w-6xl p-3">
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
