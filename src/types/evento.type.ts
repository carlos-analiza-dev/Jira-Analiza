export type DataEventos = {
  id: string;
  nombre?: string;
  descripcion?: string;
  fechaInicio: Date;
  fechaFin: Date;
  tipoEvento?: string;
  estado?: string;
  usuarios: {
    id: string;
    nombre: string;
    correo: string;
    sexo: string;
    edad: number;
    dni: string;
    direccion: string;
    autorizado: number;
    isActive: number;
  }[];
  responsable: {
    id: string;
    nombre: string;
    correo: string;
    sexo: string;
    edad: number;
    dni: string;
    direccion: string;
    autorizado: number;
    isActive: number;
  };
  usuarioCreador: {
    id: string;
    nombre: string;
    role: {
      id: string;
      nombre: string;
    };
  };
};
