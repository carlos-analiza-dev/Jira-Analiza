import { get } from "@/helpers/axiosInstance";
import { useEffect, useState } from "react";

const useGetEmpresas = (token?: string, check?: boolean) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/empresa/empresas`;
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
  }, [url, token, check]);

  return { result, loading, error };
};

export default useGetEmpresas;
