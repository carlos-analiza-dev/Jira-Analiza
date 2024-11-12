import { get } from "@/helpers/axiosInstance";
import { UsersByEmpresa } from "@/types/user.type";
import { useEffect, useState } from "react";

const useGetUsersByEmpresa = (token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/users-empresa`;

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getAuthUsers = async () => {
      setLoading(true);
      try {
        const response = await get<UsersByEmpresa[]>(url, "", token);

        setResult(response);
        setError("");
      } catch (error: any) {
        setError(error.message || "Ocurrió un error en la petición");
      } finally {
        setLoading(false);
      }
    };

    getAuthUsers();
  }, [url, token]);

  return { result, loading, error };
};

export default useGetUsersByEmpresa;
