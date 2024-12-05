import useSWR from "swr";
import { get } from "@/helpers/axiosInstance";
import { DataEventos } from "@/types/evento.type";

const useGetEventosResponsable = (token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/evento/mis-eventos-responsable`;

  const { data, error, isLoading } = useSWR(
    token ? [url, token] : null,
    ([url, token]) => get<DataEventos[]>(url, "", token),
    {
      refreshInterval: 1000,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  );

  return {
    result: data,
    loading: isLoading,
    error: error
      ? error.message || "Hubo un error al momento de extraer los eventos"
      : null,
  };
};

export default useGetEventosResponsable;
