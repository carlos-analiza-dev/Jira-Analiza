import { z } from "zod";

export type TareasData = {
  id: string;
  titulo: string;
  descripcion: string;
  estado: string;
  proyecto: {
    id: string;
    cliente: string;
    descripcion: string;
  };
  creador: {
    id: string;
    nombre: string;
  };
};

export const taskStatus = z.enum(["Nueva", "EnProgreso", "Finalizada"]);
