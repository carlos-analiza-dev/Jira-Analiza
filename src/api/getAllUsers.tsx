import { useEffect, useState } from "react";
import { get } from "../helpers/axiosInstance";

const useAllUsers = (check?: boolean) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/users`;
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await get(url);
        setResult(res);
      } catch (error: any) {
        setError(error.message || "Error al obtener los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, check]);

  return { result, loading, error };
};

export default useAllUsers;
