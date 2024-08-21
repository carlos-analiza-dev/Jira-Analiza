import { post } from "@/helpers/axiosInstance";
import { SucursalData } from "@/types/sucursal.type";

const createSucursal = async (data: SucursalData, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/sucursal`;

  const response = await post(url, data, token);
  return response;
};

export default createSucursal;
