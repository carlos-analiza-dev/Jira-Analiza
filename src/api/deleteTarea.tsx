import { remove } from "@/helpers/axiosInstance";

const deleteTarea = async (tareaId: string, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/tareas/${tareaId}`;
  const response = await remove(url, token);
  return response;
};

export default deleteTarea;
