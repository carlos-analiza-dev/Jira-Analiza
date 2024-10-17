import { patch } from "@/helpers/axiosInstance";
import { PostEvento } from "@/types/postEevento";
import React from "react";

const updateEvento = async (id: string, data: PostEvento, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/evento/${id}`;
  const response = await patch(url, data, token);
  return response;
};

export default updateEvento;
