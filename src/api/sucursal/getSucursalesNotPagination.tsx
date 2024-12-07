import { get } from "@/helpers/axiosInstance";
import { useEffect, useState } from "react";

const useAllSucursales = (token?: string, pais: string = "") => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/sucursal/sucursales?pais=${pais}`;

  const [resultSucursal, setResultSucursal] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAllSucursales = async () => {
      setLoading(true);
      try {
        const response = await get(url, "", token);

        setResultSucursal(response);
        setError("");
      } catch (error: any) {
        setError(error.message || "Error al obtener los datos");
      } finally {
        setLoading(false);
      }
    };

    getAllSucursales();
  }, [url, token, pais, error]);

  return { resultSucursal, loading, error };
};

export default useAllSucursales;
