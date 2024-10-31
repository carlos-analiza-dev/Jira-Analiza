import { post } from "@/helpers/axiosInstance";
import { FormDataConfirm } from "@/types/confirm-password.type";
interface dataUpdate {
  correo: string;
  nuevaContrasena: string;
}
const confirmPasswordUpdate = async (data: dataUpdate, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/actualizar-password`;
  const response = await post(url, data, token);
  return response;
};

export default confirmPasswordUpdate;
