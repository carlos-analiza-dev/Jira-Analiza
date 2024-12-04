import { post } from "@/helpers/axiosInstance";
import { ComentariosPost } from "@/types/comentarios/comentarios.post.type";

const createComentario = async (
  data: ComentariosPost,
  tareaId: string,
  token?: string
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/comentarios-task/${tareaId}`;

  const response = await post(url, data, token);
  return response;
};

export default createComentario;
