import { get } from "@/helpers/axiosInstance";
import { useEffect, useState } from "react";

const useAllProjects = (token?: string, check?: boolean) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/proyectos/mis-proyectos`;
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAllProjects = async () => {
      setLoading(true);
      try {
        const response = await get(url, "", token);

        setResult(response);
        console.log("RESPONSE PROYECTOS", response);
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

export default useAllProjects;
