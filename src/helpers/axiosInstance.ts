import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export const get = async <T>(
  url: string,
  params?: any,
  token?: string
): Promise<T> => {
  const response = await axiosInstance.get<T>(url, {
    params,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return response.data;
};

// Función POST
export const post = async <T>(
  url: string,
  payload: any,
  token?: string
): Promise<T> => {
  const response = await axiosInstance.post<T>(url, payload, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return response.data;
};

// Función PATCH
export const patch = async <T>(
  url: string,
  payload: any,
  token?: string
): Promise<T> => {
  const response = await axiosInstance.patch<T>(url, payload, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return response.data;
};

// Función DELETE
export const remove = async <T>(url: string, token?: string): Promise<T> => {
  const response = await axiosInstance.delete<T>(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return response.data;
};
