import { get } from "@/helpers/axiosInstance";
import useSWR from "swr";
import { useSelector } from "react-redux";

interface StatusData {
  Aceptado: number;
  Pendiente: number;
  Rechazado: number;
  totalProyectos: number;
}

const fetcher = (url: string, token?: string): Promise<StatusData> =>
  get(url, "", token);

const useGetStatusProyectosByUser = (id: string) => {
  const url = id
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/proyectos/status/${id}`
    : null;

  const token = useSelector((state: any) => state.auth.token);

  const { data, error, isLoading } = useSWR<StatusData>(
    url && token ? [url, token] : null,
    ([url, token]: [string, string]) => fetcher(url, token),
    {
      refreshInterval: 4000,
    }
  );

  return {
    result: data || null,
    loading: isLoading,
    error: error ? error.message : null,
  };
};

export default useGetStatusProyectosByUser;
