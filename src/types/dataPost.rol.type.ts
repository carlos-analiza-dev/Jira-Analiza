export interface TableRolesData {
  id: string;
  nombre: string;
}

export interface RolesResponse {
  data: TableRolesData[];
  total: number;
}
