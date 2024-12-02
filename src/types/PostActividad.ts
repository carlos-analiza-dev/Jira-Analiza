export type PostActividad = {
  titulo?: string;
  descripcion?: string;
  eventoId?: string;
  fechaInicio?: Date;
  fechaFin?: Date;
  usuarioAsignado?: string;
  actividadDependenciaId?: string;
  estado?: string;
};
