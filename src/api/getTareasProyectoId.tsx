import { get } from "@/helpers/axiosInstance";
import { useEffect, useState } from "react";

const useTareasProyectosId = (id: string, token?: string, check?: boolean) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/tareas/${id}`;
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProject = async () => {
      setLoading(true);
      try {
        const response = await get(url, "", token);

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
  }, [url, token, id, check]);

  return { result, loading, error };
};

export default useTareasProyectosId;
