import { get } from "@/helpers/axiosInstance";
import { useEffect, useState } from "react";

const useGetUsersByRolesProyectos = (
  token?: string,
  pais: string = "",
  departamento: string = "",
  proyectoId?: string
) => {
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

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/usersByProjectRole/${proyectoId}?pais=${pais}&departamento=${departamento}`;
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
  }, [pais, departamento, token]);

  return { result, loading, error };
};

export default useGetUsersByRolesProyectos;
