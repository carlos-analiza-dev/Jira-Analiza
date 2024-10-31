import { post } from "@/helpers/axiosInstance";
import { DataProject } from "@/types/dataProjects.type";

const createProjects = async (data: DataProject, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/proyectos`;
  const response = await post(url, data, token);
  return response;
};

export default createProjects;
