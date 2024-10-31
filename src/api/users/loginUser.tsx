import { post } from "@/helpers/axiosInstance";
import { PostLoginData } from "@/types/dataPostLogin";

const postLoginUser = async (dataUser: PostLoginData) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`;

  const response = await post(url, dataUser);

  return response;
};

export default postLoginUser;
