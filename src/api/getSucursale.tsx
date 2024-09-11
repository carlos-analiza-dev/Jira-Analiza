import { get } from "@/helpers/axiosInstance";
import { useEffect, useState } from "react";

const useAllSucursal = (check?: boolean, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/sucursal`;
  const [resultSucursal, setResultSucursal] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAllSucursales = async () => {
      try {
        const response = await get(url, "", token);
        setResultSucursal(response);

        setLoading(false);
      } catch (error: any) {
        setError(error.message || "Error al obtener los datos");
        setLoading(true);
      }
    };
    getAllSucursales();
  }, [url, check]);

  return { resultSucursal, loading, error };
};

export default useAllSucursal;
