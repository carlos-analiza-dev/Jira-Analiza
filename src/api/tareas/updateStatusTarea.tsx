import { patch } from "@/helpers/axiosInstance";

const updateStatusTarea = async (
  tareaId: string,
  estado: string,
  token?: string
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/tareas/${tareaId}`;

  const response = await patch(url, { estado }, token);

  return response;
};

export default updateStatusTarea;
