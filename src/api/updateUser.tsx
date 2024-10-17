import { patch } from "@/helpers/axiosInstance";

const updateUser = async (userId: string, updateData: any, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/${userId}`;

  const response = await patch(url, updateData, token);
  console.log("respomse desde funcion", response);

  return response;
};

export default updateUser;
