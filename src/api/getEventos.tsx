import { get } from "@/helpers/axiosInstance";

export async function getEventos(token?: string) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/evento`;
  const data = await get(url, "", token);
  return data;
}
