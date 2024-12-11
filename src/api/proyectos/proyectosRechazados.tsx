import { get } from "@/helpers/axiosInstance";
import { TypeProyectos } from "@/types/proyectos.type";
import { useEffect, useState } from "react";

const useGetProyectosRechazados = (check: boolean, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/proyectos/rechazados`;

  const [result, setResult] = useState<TypeProyectos[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAllProjects = async () => {
      setLoading(true);
      try {
        const response = await get(url, "", token);

        setResult(response as TypeProyectos[]);
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

export default useGetProyectosRechazados;
