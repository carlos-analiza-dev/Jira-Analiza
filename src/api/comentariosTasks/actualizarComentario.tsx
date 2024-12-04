import { patch } from "@/helpers/axiosInstance";
import { ComentariosPost } from "@/types/comentarios/comentarios.post.type";

const actualizarComentario = async (
  comentarioId: string,
  data: ComentariosPost,
  token?: string
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/comentarios-task/${comentarioId}`;

  const response = await patch(url, data, token);

  return response;
};

export default actualizarComentario;
