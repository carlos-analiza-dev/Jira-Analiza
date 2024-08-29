export type UserUpdateType = {
  id: string;
  nombre: string;
  correo: string;
  sexo: string;
  edad: number;
  dni: string;
  role: {
    id: string;
    nombre: string;
  };
  sucursal: {
    id: string;
    nombre: string;
    departamento: string;
    direccion: string;
  };
  direccion: string;
  autorizado?: number;
  isActive?: number;
};
