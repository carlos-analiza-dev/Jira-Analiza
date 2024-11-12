export type UserType = {
  id: string;
  nombre: string;
  correo: string;
  sexo: string;
  edad: number;
  dni: string;
  rol: string;
  empresa: string;
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

export type UserResponse = {
  data: UserType[];
  total: number;
};

export type UsersByRolPais = {
  role: string;
  count: number;
};

export type UsersByEmpresa = {
  emoresa: string;
  count: number;
};
