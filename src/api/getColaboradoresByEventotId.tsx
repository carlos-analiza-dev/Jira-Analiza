import { get } from "@/helpers/axiosInstance";
import { useEffect, useState } from "react";

const useColaboradoresByEventoId = (
  eventoId: string,
  token?: string,
  check2?: boolean
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/evento/${eventoId}/colaborador`;
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProject = async () => {
      setLoading(true);
      try {
        const response = await get(url, "", token);

        setResult(response);
      } catch (error: any) {
        setError(
          error.message ||
            "Hubo un error al momento de extraer los colaboradores"
        );
      } finally {
        setLoading(false);
      }
    };

    getProject();
  }, [url, token, eventoId, check2]);

  return { result, loading, error };
};

export default useColaboradoresByEventoId;
