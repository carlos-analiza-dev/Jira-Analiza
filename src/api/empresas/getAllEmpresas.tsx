import { get } from "@/helpers/axiosInstance";
import { useEffect, useState } from "react";

const useGetAllEmpresas = (
  token?: string,
  check?: boolean,
  offset: number = 0,
  limit: number = 5
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/empresa?offset=${offset}&limit=${limit}`;
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        const response = await get(url, "", token);

        setResult(response);
        setError("");
      } catch (error: any) {
        setError(error.message || "Error al obtener los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [url, error, check, token]);

  return { result, loading, error };
};

export default useGetAllEmpresas;
