export type PostTarea = {
  titulo?: string;
  descripcion?: string;
  proyectoId?: string;
  fechaInicio: Date;
  fechaFin: Date;
  usuarioAsignado?: string;
  tareaDependenciaId?: string;
  estado?: string;
};
