import { TypeProyectos } from "@/types/proyectos.type";
import { GripVertical } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatFecha } from "@/helpers/formatDate";
interface Props {
  result: TypeProyectos[];
}
const Proyectos = ({ result }: Props) => {
  const user = useSelector((state: any) => state.auth);

  if (!result || result.length === 0) {
    return (
      <div className="flex justify-center items-center h-full w-full mt-5">
        <p className="ext-custom-title dark:text-white">
          No hay proyectos aun{" "}
          <Link
            className="text-purple-500 dark:text-sky-400 font-bold hover:underline"
            href="/admin-proyectos/create"
          >
            Crear proyecto
          </Link>
        </p>
      </div>
    );
  }
  return (
    <div className="mt-10 mx-auto w-full">
      {result.map((proyecto) => (
        <div
          className="bg-gray-50 p-5 rounded-sm mt-4 dark:bg-gray-900"
          key={proyecto.id}
        >
          {user.id === proyecto.creador.id ? (
            <div className="w-3/12 mb-4">
              <p className=" p-2 bg-custom-title text-white shadow-md rounded-md text-center">
                Manager
              </p>
            </div>
          ) : (
            <div className="w-3/12 mb-4">
              <p className=" p-2 bg-custom-title text-white shadow-md rounded-md text-center">
                Colaborador
              </p>
            </div>
          )}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-custom-title dark:text-white">
                {proyecto.nombre}
              </h1>
              <p className="font-bold text-custom-title dark:text-white text-lg mt-3">
                Cliente:{" "}
                <span className="font-medium text-custom-title dark:text-white">
                  {proyecto.cliente}
                </span>
              </p>
              <p className="text-lg font-semibold text-custom-title dark:text-white mt-3">
                {proyecto.descripcion}
              </p>
              <p className="text-sm font-medium text-custom-title dark:text-white mt-3">
                Creado:{" "}
                <span className="">{formatFecha(proyecto.fechaCreacion)}</span>
              </p>
            </div>
            <div className="cursor-pointer">
              <Popover>
                <PopoverTrigger asChild>
                  <GripVertical />
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <p className="font-medium text-custom-title dark:text-white">
                        Ver Proyecto
                      </p>
                      <p className="text-sm text-custom-title dark:text-white">
                        Editar Proyecto
                      </p>
                      <p className="text-sm text-red-500">Eliminar Proyecto</p>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Proyectos;
