import { post } from "@/helpers/axiosInstance";
import { PostTarea } from "@/types/postTareas.type";

const createTarea = async (data: PostTarea, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/tareas`;

  const response = await post(url, data, token);
  return response;
};

export default createTarea;
