export type ComentariosType = {
  id: string;
  contenido: string;
  createdAt: string;
  autor: {
    id: string;
    nombre: string;
    correo: string;
    edad: string;
    sexo: string;
    pais: string;
    dni: string;
  };
};
