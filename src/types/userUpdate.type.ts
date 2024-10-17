export type UserUpdateType = {
  nombre?: string;
  correo?: string;
  sexo?: string;
  edad?: number;
  dni?: string;
  rol?: string;
  role?: {
    id: string;
  };
  sucursal?: {
    id: string;
  };
  direccion?: string;
  autorizado?: number;
  isActive?: number;
};
