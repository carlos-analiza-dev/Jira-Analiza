import { patch } from "@/helpers/axiosInstance";
import { DataProject } from "@/types/dataProjects.type";

const updateProyecto = async (
  proyectoId: string,
  data: DataProject,
  token?: string
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/proyectos/${proyectoId}`;
  const response = await patch(url, data, token);
  return response;
};

export default updateProyecto;
