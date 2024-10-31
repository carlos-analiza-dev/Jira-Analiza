import { remove } from "@/helpers/axiosInstance";

const deleteColaboradorByEvento = async (
  eventoId: string,
  userId: string,
  token?: string
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/evento/${eventoId}/${userId}/colaborador`;
  const response = await remove(url, token);
  return response;
};

export default deleteColaboradorByEvento;
