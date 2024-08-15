import { patch } from "@/helpers/axiosInstance";

const updateUser = async (userId: string, updateData: any, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/${userId}`;

  try {
    const response = await patch(url, updateData);

    return response;
  } catch (error) {
    console.log(error);
  }
};

export default updateUser;
