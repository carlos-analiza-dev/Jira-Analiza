import { post } from "@/helpers/axiosInstance";
import { TableRolesData } from "@/types/table.roles.type";

const createRol = async (data: TableRolesData, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/roles`;

  const response = await post(url, data, token);

  return response;
};

export default createRol;
