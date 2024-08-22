import { patch } from "@/helpers/axiosInstance";

const updateRol = async (id: string, nombre: string, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/roles/${id}`;

  const response = await patch(url, { nombre }, token);

  return response;
};

export default updateRol;
