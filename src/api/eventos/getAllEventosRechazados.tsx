import { get } from "@/helpers/axiosInstance";
import { EventosRechazadosResponse } from "@/types/eventos-rechazados/eventos-rechazados.type";
import { useEffect, useState } from "react";

const useAllEventosRechazados = (
  id: string,
  token?: string,
  limit: number = 5,
  offset: number = 0
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/eventos-rechazados/rechazados/${id}?limit=${limit}&offset=${offset}`;
  const [result, setResult] = useState<EventosRechazadosResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAllEventos = async () => {
      setLoading(true);
      try {
        const response = await get<EventosRechazadosResponse>(url, "", token);

        setResult(response as EventosRechazadosResponse);
      } catch (error: any) {
        setError(
          error.message || "Hubo un error al momento de extraer los eventos"
        );
      } finally {
        setLoading(false);
      }
    };

    getAllEventos();
  }, [url, token, limit, offset]);

  return { result, loading, error };
};

export default useAllEventosRechazados;
