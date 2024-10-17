import { patch } from "@/helpers/axiosInstance";
import { PostActividad } from "@/types/PostActividad";

const updateActividad = async (
  actividadId: string,
  data: PostActividad,
  token?: string
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/actividades/${actividadId}`;

  const response = await patch(url, data, token);

  return response;
};

export default updateActividad;
