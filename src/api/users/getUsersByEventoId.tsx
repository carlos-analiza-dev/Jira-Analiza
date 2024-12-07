import { get } from "@/helpers/axiosInstance";
import { useEffect, useState } from "react";

const useGetUsersByEventoId = (
  pais: string = "",
  departamento: string = "",
  token?: string
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/usersByEventos?pais=${pais}&departamento=${departamento}`;
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!pais || !token) {
      setResult(null);
      setError("Debe seleccionar un país y tener un token válido.");
      setLoading(false);
      return;
    }

    const getAuthUsers = async () => {
      setLoading(true);
      try {
        const response = await get(url, "", token);

        setResult(response);
        setError("");
      } catch (error: any) {
        setError(error.message || "Ocurrió un error en la petición");
      } finally {
        setLoading(false);
      }
    };

    getAuthUsers();
  }, [pais, token, departamento, url]);

  return { result, loading, error };
};

export default useGetUsersByEventoId;
