import { get } from "@/helpers/axiosInstance";
import { SucursalesResponse } from "@/types/sucursal.type";
import { useEffect, useState } from "react";

const useAllSucursal = (
  check?: boolean,
  token?: string,
  offset: number = 0,
  limit: number = 5,
  departamento: string = ""
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/sucursal?limit=${limit}&offset=${offset}&departamento=${departamento}`;

  const [resultSucursal, setResultSucursal] =
    useState<SucursalesResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAllSucursales = async () => {
      setLoading(true);
      try {
        const response = await get(url, "", token);
        console.log("RESPONSE DESDE FUNCION", response);

        setResultSucursal(response as SucursalesResponse);
        setError("");
      } catch (error: any) {
        setError(error.message || "Error al obtener los datos");
      } finally {
        setLoading(false);
      }
    };

    getAllSucursales();
  }, [url, check, error]);

  return { resultSucursal, loading, error };
};

export default useAllSucursal;
