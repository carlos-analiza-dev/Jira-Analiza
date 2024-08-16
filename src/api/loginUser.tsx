import { post } from "@/helpers/axiosInstance";
import { PostLoginData } from "@/types/dataPostLogin";

const postLoginUser = async (dataUser: PostLoginData) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`;
  console.log("URL", url);

  const response = await post(url, dataUser);
  console.log("RESPONSE LOGIN", response);

  return response;
};

export default postLoginUser;
