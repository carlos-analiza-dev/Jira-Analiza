import { get } from "@/helpers/axiosInstance";
import { useEffect, useState } from "react";

const useGetEventosByUser = (token?: string, check?: boolean) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/evento`;
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getEventosByUser = async () => {
      setLoading(true);
      try {
        const response = await get(url, "", token);
        setResult(response);
        setLoading(false);
      } catch (error: any) {
        setError(
          error.message || "Hubo un error al momento de extraer los proyectos"
        );
        setLoading(false);
      }
    };
    getEventosByUser();
  }, [check]);

  return { result, loading, error };
};

export default useGetEventosByUser;
