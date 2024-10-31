import { post } from "@/helpers/axiosInstance";
interface sendEmail {
  correo: string;
}
const resetPassword = async (data: sendEmail, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/sendmail`;

  const response = await post(url, data, token);
  return response;
};

export default resetPassword;
