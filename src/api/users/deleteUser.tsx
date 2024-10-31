import { remove } from "@/helpers/axiosInstance";

const deleteUser = async (id: string, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/${id}`;
  const response = await remove(url, token);
  return response;
};

export default deleteUser;
