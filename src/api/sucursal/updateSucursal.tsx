import { patch } from "@/helpers/axiosInstance";
import { SucursalData } from "@/types/sucursal.type";

const updateSucursal = async (
  id: string,
  data: Omit<SucursalData, "id">,
  token?: string
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/sucursal/${id}`;
  const response = await patch(url, data, token);
  return response;
};

export default updateSucursal;
