import useSWR from "swr";
import { get } from "@/helpers/axiosInstance";
import { TypeProyectos } from "@/types/proyectos.type";

const useGetProjectsResponsable = (token?: string, check?: boolean) => {
  const url = token
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/proyectos/mis-proyectos-responsable`
    : null;

  const fetcher = async (url: string) => {
    const response = await get<TypeProyectos[]>(url, "", token);
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
      ? error.message || "Hubo un error al momento de extraer los proyectos"
      : null,
  };
};

export default useGetProjectsResponsable;
