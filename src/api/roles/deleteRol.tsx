import { remove } from "@/helpers/axiosInstance";

const deleteRol = async (id: string, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/roles/${id}`;
  const response = await remove(url, token);
  return response;
};

export default deleteRol;
