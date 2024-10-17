import { get } from "@/helpers/axiosInstance";
import { useEffect, useState } from "react";

const useAllDepartamentos = (token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/roles/departamentos`;
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

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
  }, [url, error]);

  return { result, loading, error };
};

export default useAllDepartamentos;
