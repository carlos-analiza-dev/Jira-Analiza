import { get } from "@/helpers/axiosInstance";

import { useEffect, useState } from "react";

const useGetUsersByRolesEventos = (
  token?: string,
  pais: string = "",
  departamento: string = "",
  eventoId?: string
) => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/usersByEventoRole/${eventoId}?pais=${pais}&departamento=${departamento}`;

  useEffect(() => {
    if (!pais || !token) {
      setResult(null);
      setError("Debe seleccionar un país y tener un token válido.");
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await get(url, "", token);
        setResult(response);
        setError("");
      } catch (error: any) {
        setError(error.response?.data?.message || "Error en la petición");
        setResult(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [pais, departamento, token, url]);

  return { result, loading, error };
};

export default useGetUsersByRolesEventos;
