export type ActividadesType = {
  id: string;
  descripcion: string;
  estado: string;
  titulo: string;
  fechaInicio?: Date;
  fechaFin?: Date;
  actualizadoPor: {
    id: string;
    nombre: string;
    correo: string;
  };
  usuarioAsignado: {
    id: string;
    nombre: string;
    correo: string;
  };
  creador: {
    id: string;
    nombre: string;
    correo: string;
  };
};
