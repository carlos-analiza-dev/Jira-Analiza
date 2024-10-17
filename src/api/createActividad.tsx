import { post } from "@/helpers/axiosInstance";
import { PostActividad } from "@/types/PostActividad";

const createActividad = async (data: PostActividad, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/actividades`;

  const response = await post(url, data, token);
  return response;
};

export default createActividad;
