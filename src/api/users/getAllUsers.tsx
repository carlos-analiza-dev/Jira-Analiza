import { useEffect, useState } from "react";
import { get } from "../../helpers/axiosInstance";

const useAllUsers = (
  check?: boolean,
  token?: string,
  limit: number = 5,
  offset: number = 0,
  sexo: string = "",
  sucursal: string = "",
  correo: string = "",
  pais: string = ""
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/users?limit=${limit}&offset=${offset}&sexo=${sexo}&sucursal=${sucursal}&correo=${correo}&pais=${pais}`;
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await get(url, "", token);
        setResult(res);
        setError("");
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
