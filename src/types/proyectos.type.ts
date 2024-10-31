export type TypeProyectos = {
  id: string;
  nombre: string;
  cliente: string;
  descripcion: string;
  estado: string;
  fechaCreacion: string;
  creador: {
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
  rolDirigido: {
    id: string;
    nombre: string;
  };
  empresa: {
    id: string;
    nombre: string;
    descripcion: string;
    estado: string;
  };
};
