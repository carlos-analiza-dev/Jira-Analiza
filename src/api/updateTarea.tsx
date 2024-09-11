import { patch } from "@/helpers/axiosInstance";
import { PostTarea } from "@/types/postTareas.type";

const updateTarea = async (
  tareaId: string,
  data: PostTarea,
  token?: string
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/tareas/${tareaId}`;

  const response = await patch(url, data, token);

  return response;
};

export default updateTarea;
