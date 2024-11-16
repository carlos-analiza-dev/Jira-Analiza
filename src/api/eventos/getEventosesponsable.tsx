import useSWR from "swr";
import { get } from "@/helpers/axiosInstance";
import { DataEventos } from "@/types/evento.type";

const useGetEventosResponsable = (token?: string) => {
  const url = token
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/evento/mis-eventos-responsable`
    : null;

  const fetcher = async (url: string) => {
    const response = await get<DataEventos[]>(url, "", token);
    return response;
  };

  const {
    data: result,
    error,
    isLoading,
  } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  });

  return {
    result,
    loading: isLoading,
    error: error
      ? error.message || "Hubo un error al momento de extraer los eventos"
      : null,
  };
};

export default useGetEventosResponsable;
