import { remove } from "@/helpers/axiosInstance";

const deleteEmpresa = async (id: string, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/empresa/${id}`;
  const response = await remove(url, token);
  return response;
};

export default deleteEmpresa;
