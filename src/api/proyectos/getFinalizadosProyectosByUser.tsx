import { get } from "@/helpers/axiosInstance";
import useSWR from "swr";
import { useSelector } from "react-redux";

interface StatusDataFinalizados {
  creador: number;
  responsable: number;
  total: number;
}

const fetcher = (url: string, token?: string): Promise<StatusDataFinalizados> =>
  get(url, "", token);

const useGetFinalizadosProyectosByUser = (id: string) => {
  const url = id
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/proyectos/finalizados/${id}`
    : null;

  const token = useSelector((state: any) => state.auth.token);

  const { data, error, isLoading } = useSWR<StatusDataFinalizados>(
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

export default useGetFinalizadosProyectosByUser;
