export type UserType = {
  id: string;
  nombre: string;
  correo: string;
  sexo: string;
  edad: number;
  dni: string;
  direccion: string;
  autorizado?: number;
  isActive?: number;
  role?: {
    nombre: string;
  };
  sucursal?: {
    nombre: string;
  };
};
