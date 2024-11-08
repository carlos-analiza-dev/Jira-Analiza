import { get } from "@/helpers/axiosInstance";
import { ResponseEvento } from "@/types/evento.type";
import { useEffect, useState } from "react";

const useGetEventosManager = (
  token?: string,
  check?: boolean,
  limit: number = 5,
  offset: number = 0,
  tipoEvento: string = ""
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/evento/manager?limit=${limit}&offset=${offset}&tipoEvento=${tipoEvento}`;

  const [result, setResult] = useState<ResponseEvento | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAllProjects = async () => {
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

    getAllProjects();
  }, [url, token, check]);

  return { result, loading, error };
};

export default useGetEventosManager;
