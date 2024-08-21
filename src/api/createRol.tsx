import { post } from "@/helpers/axiosInstance";
import { DataRol } from "@/types/dataPost.rol.type";

const createRol = async (data: DataRol, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/roles`;

  const response = await post(url, data, token);

  return response;
};

export default createRol;
