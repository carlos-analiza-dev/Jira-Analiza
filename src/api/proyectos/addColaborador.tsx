import { post } from "@/helpers/axiosInstance";

type DataColaborador = {
  userId: string;
};

const addColaborador = async (
  proyectoId: string,
  userData: DataColaborador,
  token?: string
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/proyectos/${proyectoId}/colaborador`;
  const response = await post(url, userData, token);
  return response;
};

export default addColaborador;
