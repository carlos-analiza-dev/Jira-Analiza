import { get } from "@/helpers/axiosInstance";
import { ResponseProyectos } from "@/types/proyectos.type";
import { useEffect, useState } from "react";

const useGetProyectosRechazados = (
  check: boolean,
  token?: string,
  limit: number = 5,
  offset: number = 0
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/proyectos/rechazados?limit=${limit}&offset=${offset}`;

  const [result, setResult] = useState<ResponseProyectos | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAllProjects = async () => {
      setLoading(true);
      try {
        const response = await get(url, "", token);

        setResult(response as ResponseProyectos);
      } catch (error: any) {
        setError(
          error.message || "Hubo un error al momento de extraer los proyectos"
        );
      } finally {
        setLoading(false);
      }
    };

    getAllProjects();
  }, [url, token, check, limit, offset]);

  return { result, loading, error };
};

export default useGetProyectosRechazados;
