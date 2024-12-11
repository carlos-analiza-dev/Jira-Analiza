import { get } from "@/helpers/axiosInstance";
import { DataEventos } from "@/types/evento.type";
import { useEffect, useState } from "react";

const useGetEventosRechazados = (check: boolean, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/evento/eventos-rechazados`;

  const [result, setResult] = useState<DataEventos[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAllEventos = async () => {
      setLoading(true);
      try {
        const response = await get(url, "", token);

        setResult(response as DataEventos[]);
      } catch (error: any) {
        setError(
          error.message || "Hubo un error al momento de extraer los proyectos"
        );
      } finally {
        setLoading(false);
      }
    };

    getAllEventos();
  }, [url, token, check]);

  return { result, loading, error };
};

export default useGetEventosRechazados;
