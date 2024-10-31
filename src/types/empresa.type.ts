export interface DataEmpresa {
  id: string;
  nombre: string;
  descripcion: string;
  estado?: string;
}

export interface ResponseEmpresas {
  empresas: DataEmpresa[];
  total: number;
}

export interface PostEmpresa {
  nombre: string;
  descripcion: string;
  estado?: string;
}
