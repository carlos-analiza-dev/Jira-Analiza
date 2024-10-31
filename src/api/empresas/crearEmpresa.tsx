import { post } from "@/helpers/axiosInstance";
import { PostEmpresa } from "@/types/empresa.type";

const crearEmpresa = async (token?: string, data?: PostEmpresa) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/empresa`;
  const response = await post(url, data, token);
  return response;
};

export default crearEmpresa;
