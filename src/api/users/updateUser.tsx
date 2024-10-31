import { patch } from "@/helpers/axiosInstance";
import { UserUpdateType } from "@/types/userUpdate.type";

const updateUser = async (
  userId: string,
  updateData: UserUpdateType,
  token?: string
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/${userId}`;

  const response = await patch(url, updateData, token);

  return response;
};

export default updateUser;
