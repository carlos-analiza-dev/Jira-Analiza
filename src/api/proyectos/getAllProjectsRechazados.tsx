import { get } from "@/helpers/axiosInstance";
import { ProyectosRechazadosResponse } from "@/types/proyectos-rechazados/proyectos-rechazados.type";
import { useEffect, useState } from "react";

const useAllProjectsRechazados = (
  id: string,
  token?: string,
  limit: number = 5,
  offset: number = 0
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/proyectos-rechazados/rechazados/${id}?limit=${limit}&offset=${offset}`;
  const [result, setResult] = useState<ProyectosRechazadosResponse | null>(
    null
  );
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAllProjects = async () => {
      setLoading(true);
      try {
        const response = await get<ProyectosRechazadosResponse>(url, "", token);

        setResult(response as ProyectosRechazadosResponse);
      } catch (error: any) {
        setError(
          error.message || "Hubo un error al momento de extraer los proyectos"
        );
      } finally {
        setLoading(false);
      }
    };

    getAllProjects();
  }, [url, token, limit, offset]);

  return { result, loading, error };
};

export default useAllProjectsRechazados;
