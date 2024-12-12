import { get } from "@/helpers/axiosInstance";
import { ResponseEvento } from "@/types/evento.type";
import { useEffect, useState } from "react";

const useGetEventosRechazados = (
  check: boolean,
  token?: string,
  limit: number = 5,
  offset: number = 0
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/evento/eventos-rechazados?limit=${limit}&offset=${offset}`;

  const [result, setResult] = useState<ResponseEvento | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAllEventos = async () => {
      setLoading(true);
      try {
        const response = await get(url, "", token);

        setResult(response as ResponseEvento);
      } catch (error: any) {
        setError(
          error.message || "Hubo un error al momento de extraer los proyectos"
        );
      } finally {
        setLoading(false);
      }
    };

    getAllEventos();
  }, [url, token, check, limit, offset]);

  return { result, loading, error };
};

export default useGetEventosRechazados;
