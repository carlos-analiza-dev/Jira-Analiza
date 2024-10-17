import { remove } from "@/helpers/axiosInstance";

const deleteActividad = async (actividadId: string, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/actividades/${actividadId}`;
  const response = await remove(url, token);
  return response;
};

export default deleteActividad;
