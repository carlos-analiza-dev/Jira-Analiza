import { z } from "zod";

export type TareasData = {
  id: string;
  titulo: string;
  descripcion: string;
  estado: string;
  updatedAt: string;
  proyecto: {
    id: string;
    cliente: string;
    descripcion: string;
  };
  creador: {
    id: string;
    nombre: string;
  };

  actualizadoPor: {
    nombre: string;
  };
  usuarioAsignado: {
    id: string;
    nombre: string;
  };
};

export const taskStatus = z.enum([
  "Nueva",
  "Recibida",
  "EnProgreso",
  "Finalizada",
]);
