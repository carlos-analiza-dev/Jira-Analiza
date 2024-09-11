import { post } from "@/helpers/axiosInstance";
import { CorreoType } from "@/types/correo.post.type";

const postEmailByUser = async (data: CorreoType, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/colaborador`;
  const response = await post(url, data, token);
  return response;
};

export default postEmailByUser;
