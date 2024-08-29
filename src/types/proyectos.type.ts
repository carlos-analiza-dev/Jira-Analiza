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
  };
  role: {
    id: string;
    nombre: string;
  };
};
