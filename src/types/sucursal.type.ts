export interface SucursalData {
  id: string;
  nombre: string;
  departamento: string;
  direccion: string;
}

export interface SucursalesResponse {
  data: SucursalData[];
  total: number;
}
