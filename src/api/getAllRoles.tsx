import { get } from "@/helpers/axiosInstance";
import { useEffect, useState } from "react";

const useAllRoles = (trigger?: boolean) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/roles`;
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        const response = await get(url);
        setResult(response);
        console.log("RESPONSE ROLES", response);
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
