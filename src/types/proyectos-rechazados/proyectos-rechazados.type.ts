interface Proyecto {
  id: string;
  nombre: string;
  cliente: string;
  descripcion: string;
  estado: string;
  statusProject: string;
  justificacion: string;
  fechaCreacion: string;
  creador: Usuario;
  usuarios: Usuario[];
  responsable: Usuario;
  rolDirigido: RolDirigido;
  empresa: Empresa;
}

interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  sexo: string;
  edad: number;
  pais: string;
  empresa: string;
  dni: string;
  direccion: string;
  autorizado: number;
  isActive: number;
  rol: string;
}

interface RolDirigido {
  id: string;
  nombre: string;
  pais: string;
}

interface Empresa {
  id: string;
  nombre: string;
  descripcion: string;
  estado: string;
}

export interface ProyectosRechazado {
  id: string;
  fechaRechazo: string;
  motivoRechazo: string;
  proyecto: Proyecto;
  usuario: Usuario;
}

export interface ProyectosRechazadosResponse {
  proyectosRechazados: ProyectosRechazado[];
  total: number;
}
