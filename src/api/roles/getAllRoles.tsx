import { get } from "@/helpers/axiosInstance";
import { RolesResponse } from "@/types/dataPost.rol.type";
import { useEffect, useState } from "react";

const useAllRoles = (
  trigger?: boolean,
  offset: number = 0,
  limit: number = 5,
  token?: string,
  pais: string = ""
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/roles?limit=${limit}&offset=${offset}&pais=${pais}`;

  const [result, setResult] = useState<RolesResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        const response = await get(url, "", token);

        setResult(response as RolesResponse);
        setError("");
      } catch (error: any) {
        setError(error.message || "Error al obtener los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [url, trigger, offset, limit, token, pais]);

  return { result, loading, error };
};

export default useAllRoles;
