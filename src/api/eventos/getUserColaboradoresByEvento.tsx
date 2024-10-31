import { get } from "@/helpers/axiosInstance";
import { useEffect, useState } from "react";

const useGetColaboradoresEventos = (eventoId: string, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/evento/${eventoId}/colaboradores`;

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getAuthUsers = async () => {
      setLoading(true);
      try {
        const response = await get(url, "", token);

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

export default useGetColaboradoresEventos;
