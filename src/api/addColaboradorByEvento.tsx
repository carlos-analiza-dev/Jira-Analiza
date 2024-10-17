import { post } from "@/helpers/axiosInstance";

type DataColaborador = {
  userId: string;
};

const addColaboradorByEvento = async (
  eventoId: string,
  userData: DataColaborador,
  token?: string
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/evento/${eventoId}/colaborador`;
  const response = await post(url, userData, token);
  return response;
};

export default addColaboradorByEvento;
