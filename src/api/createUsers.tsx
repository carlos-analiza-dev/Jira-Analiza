import { post } from "@/helpers/axiosInstance";
import { DataPost } from "@/types/dataPostUser.type";

const createUsers = async (dataPost: DataPost, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`;

  const response = await post(url, dataPost, token);

  return response;
};

export default createUsers;
