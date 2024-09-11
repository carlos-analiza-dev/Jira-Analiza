import { get } from "@/helpers/axiosInstance";
import { useEffect, useState } from "react";

const useAllRoles = (
  trigger?: boolean,
  offset: number = 0,
  limit: number = 5,
  token?: string
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/roles?limit=${limit}&offset=${offset}`;
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        const response = await get(url, "", token);

        setResult(response);
      } catch (error: any) {
        setError(error.message || "Error al obtener los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [url, trigger]);

  return { result, loading, error };
};

export default useAllRoles;
