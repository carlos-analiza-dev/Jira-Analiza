import { get } from "@/helpers/axiosInstance";
import { useEffect, useState } from "react";

const useGetUserAuth = (check?: boolean, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/autorizar`;
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    const getAuthUsers = async () => {
      try {
        const response = await get(url, "", token);

        setResult(response);
        setLoading(false);
      } catch (error: any) {
        setError(error.message || "Ocurrio un error en la peticion");
        setLoading(false);
      }
    };
    getAuthUsers();
  }, [url, check]);

  return { result, loading, error };
};

export default useGetUserAuth;
