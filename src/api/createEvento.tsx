import { post } from "@/helpers/axiosInstance";
import { PostEvento } from "@/types/postEevento";

const createEvento = async (data: PostEvento, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/evento`;
  const response = await post(url, data, token);
  return response;
};

export default createEvento;
