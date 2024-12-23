import { get } from "@/helpers/axiosInstance";
import useSWR from "swr";
import { useSelector } from "react-redux";

const fetcher = (url: string, token?: string) => get(url, "", token);

const useGetUsersBySucursal = (pais: string = "") => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/users-sucursal?pais=${pais}`;

  const token = useSelector((state: any) => state.auth.token);

  const { data, error, isLoading } = useSWR(
    [url, token],
    ([url, token]) => fetcher(url, token),
    {
      refreshInterval: 4000,
    }
  );

  return {
    result: data,
    loading: isLoading,
    error: error ? error.message : null,
  };
};

export default useGetUsersBySucursal;
