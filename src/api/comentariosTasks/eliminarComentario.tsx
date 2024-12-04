import { remove } from "@/helpers/axiosInstance";

const eliminarComentario = async (comentarioId: string, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/comentarios-task/${comentarioId}`;

  const response = await remove(url, token);
  return response;
};

export default eliminarComentario;
