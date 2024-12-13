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

interface Evento {
  id: string;
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  tipoEvento: string;
  estado: string;
  statusEvento: string;
  justificacion: string;
  creadoEn: string;
  actualizadoEn: string;
  usuarioCreador: Usuario;
  usuarios: Usuario[];
  responsable: Usuario;
}

export interface EventoRechazado {
  id: string;
  fechaRechazo: string;
  motivoRechazo: string;
  evento: Evento;
  usuario: Usuario;
}

export interface EventosRechazadosResponse {
  eventosRechazados: EventoRechazado[];
  total: number;
}
