import { remove } from "@/helpers/axiosInstance";

const deleteSucursal = async (id: string, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/sucursal/${id}`;
  const response = await remove(url, token);
  return response;
};

export default deleteSucursal;
