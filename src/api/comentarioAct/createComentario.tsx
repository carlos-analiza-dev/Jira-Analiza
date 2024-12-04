import { post } from "@/helpers/axiosInstance";
import { ComentariosPost } from "@/types/comentarios/comentarios.post.type";

const createComentario = async (
  data: ComentariosPost,
  actividadId: string,
  token?: string
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/comentarios-actividad/${actividadId}`;

  const response = await post(url, data, token);
  return response;
};

export default createComentario;
