import { patch } from "@/helpers/axiosInstance";
import { PostEmpresa } from "@/types/empresa.type";

const updateEmpresa = async (id: string, data: PostEmpresa, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/empresa/${id}`;
  const response = await patch(url, data, token);
  return response;
};

export default updateEmpresa;
