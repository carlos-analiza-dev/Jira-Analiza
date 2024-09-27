import { remove } from "@/helpers/axiosInstance";

const removeEvento = async (id: string, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/evento/${id}`;
  const response = await remove(url, token);
  return response;
};

export default removeEvento;
