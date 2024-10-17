import { get } from "@/helpers/axiosInstance";
import { DataEventos } from "@/types/evento.type";
import { useEffect, useState } from "react";

const useEventoById = (eventoId: string, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/evento/${eventoId}`;
  const [result, setResult] = useState<DataEventos | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProject = async () => {
      setLoading(true);
      try {
        const response = await get<DataEventos>(url, "", token);
        setResult(response);
      } catch (error: any) {
        setError(
          error.message || "Hubo un error al momento de extraer los proyectos"
        );
      } finally {
        setLoading(false);
      }
    };

    getProject();
  }, [url, token, eventoId]);

  return { result, loading, error };
};

export default useEventoById;
