import { get } from "@/helpers/axiosInstance";
import React, { useEffect, useState } from "react";

const useGetActividadesByEventoId = (
  id: string,
  token?: string,
  check2?: boolean
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/actividades/${id}`;
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getActividades = async () => {
      setLoading(true);
      try {
        const response = await get(url, "", token);

        setResult(response);
      } catch (error: any) {
        setError(
          error.message ||
            "Hubo un error al momento de extraer las actividades del evento"
        );
      } finally {
        setLoading(false);
      }
    };

    getActividades();
  }, [url, token, id, check2]);

  return { result, loading, error };
};

export default useGetActividadesByEventoId;
