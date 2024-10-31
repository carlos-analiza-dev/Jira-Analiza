import { get } from "@/helpers/axiosInstance";
import { UserResponse } from "@/types/user.type";
import { useEffect, useState } from "react";

const useGetUserAuth = (
  check?: boolean,
  token?: string,
  limit: number = 5,
  offset: number = 0,
  sucursal: string = "",
  departamento: string = "",
  sexo: string = "",
  pais: string = ""
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/autorizar?limit=${limit}&offset=${offset}&sucursal=${sucursal}&departamento=${departamento}&sexo=${sexo}&pais=${pais}`;

  const [result, setResult] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getAuthUsers = async () => {
      setLoading(true);
      try {
        const response = await get(url, "", token);

        setResult(response as UserResponse);
        setError("");
      } catch (error: any) {
        setError(error.message || "Ocurrió un error en la petición");
      } finally {
        setLoading(false);
      }
    };

    getAuthUsers();
  }, [url, check, token]);

  return { result, loading, error };
};

export default useGetUserAuth;
