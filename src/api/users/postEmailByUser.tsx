import { post } from "@/helpers/axiosInstance";
import { CorreoType } from "@/types/correo.post.type";
import { UserType } from "@/types/user.type";

const postEmailByUser = async (data: CorreoType, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/colaborador`;
  const response = await post(url, data, token);
  return response as UserType;
};

export default postEmailByUser;
