import { get } from "@/helpers/axiosInstance";
import { TypeProyectos } from "@/types/proyectos.type";
import { useEffect, useState } from "react";

const useProyectoId = (id: string, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/proyectos/${id}`;
  const [result, setResult] = useState<TypeProyectos | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProject = async () => {
      setLoading(true);
      try {
        const response = await get<TypeProyectos>(url, "", token);
        setResult(response);
        console.log("RESPONSE", response);
        console.log("CREADOR", response.creador.nombre);
        console.log("RESPONSABLE", response.responsable.nombre);
      } catch (error: any) {
        setError(
          error.message || "Hubo un error al momento de extraer los proyectos"
        );
      } finally {
        setLoading(false);
      }
    };

    getProject();
  }, [url, token, id]);

  return { result, loading, error };
};

export default useProyectoId;
