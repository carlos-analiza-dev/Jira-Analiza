import { remove } from "@/helpers/axiosInstance";

const deleteProyecto = async (proyectoId: string, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/proyectos/${proyectoId}`;

  const response = await remove(url, token);

  return response;
};

export default deleteProyecto;
