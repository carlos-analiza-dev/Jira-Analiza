import { remove } from "@/helpers/axiosInstance";

const deleteColaboradorProject = async (
  proyectoId: string,
  userId: string,
  token?: string
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/proyectos/${proyectoId}/${userId}/colaborador`;
  const response = await remove(url, token);
  return response;
};

export default deleteColaboradorProject;
