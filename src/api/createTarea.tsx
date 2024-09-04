import { post } from "@/helpers/axiosInstance";
import { PostTarea } from "@/types/postTareas.type";

const createTarea = async (data: PostTarea, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/tareas`;
  console.log("URL Tareas", url);

  const response = await post(url, data, token);
  console.log("RESPONSE CREATE TAREA", response);
  return response;
};

export default createTarea;
