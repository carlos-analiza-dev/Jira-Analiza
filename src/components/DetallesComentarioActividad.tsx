import { Avatar, AvatarFallback } from "./ui/avatar";
import { formatFecha } from "@/helpers/formatDate";
import { ActividadesType } from "@/types/actividades.type";
import { TareasData } from "@/types/tareas.type";

interface Props {
  actividad: ActividadesType | null;
}

const DetallesComentarioActividad = ({ actividad }: Props) => {
  return (
    <div className="p-4 dark:bg-gray-700 rounded-md w-full sm:w-2/5 border-2">
      <p className="text-custom-title dark:text-white font-bold border-b-2 p-2">
        Detalles
      </p>
      <div className="mt-3 flex justify-start">
        <p className="text-custom-title dark:text-white font-semibold">
          Actualizada:{" "}
          <span className="font-normal">
            {formatFecha(actividad ? actividad.updatedAt : "")}
          </span>
        </p>
      </div>
      <div className="mt-3 flex items-center gap-3 justify-start">
        <p className="font-normal  dark:text-white  text-custom-title">
          Responsable:
        </p>
        <div className="flex sm:gap-3 items-center">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-custom-second text-white font-bold uppercase">
              {actividad?.usuarioAsignado.nombre[0]}
              {actividad?.usuarioAsignado.nombre[1]}
            </AvatarFallback>
          </Avatar>
          <span className="font-normal">
            {actividad?.usuarioAsignado.nombre}
          </span>
        </div>
      </div>
      <div className="mt-3 flex justify-start">
        <p className="text-custom-title dark:text-white font-semibold">
          Estado: <span className="font-normal">{actividad?.estado}</span>
        </p>
      </div>
      <div className="mt-3 flex justify-start">
        <p className="text-custom-title dark:text-white font-semibold">
          Prioridad: <span className="font-normal">Alta</span>
        </p>
      </div>
      <div className="mt-3 flex items-center gap-3 justify-start">
        <p className="text-custom-title dark:text-white font-semibold">
          Informador:
        </p>
        <div className="flex sm:gap-3 items-center">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-custom-second text-white font-bold uppercase ">
              {actividad?.creador.nombre[0]}
              {actividad?.creador.nombre[1]}
            </AvatarFallback>
          </Avatar>
          <span className="font-normal">{actividad?.creador.nombre}</span>
        </div>
      </div>
      <div className="mt-3 flex justify-start">
        <p className="text-custom-title dark:text-white font-semibold">
          Caduca:{" "}
          <span className="font-normal">
            {formatFecha(actividad?.fechaFin?.toString())}
          </span>
        </p>
      </div>
    </div>
  );
};

export default DetallesComentarioActividad;
