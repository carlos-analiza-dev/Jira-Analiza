import { Avatar, AvatarFallback } from "./ui/avatar";
import { formatFecha } from "@/helpers/formatDate";
import { TareasData } from "@/types/tareas.type";

interface Props {
  task: TareasData | null;
}

const DetallesComentario = ({ task }: Props) => {
  return (
    <div className="p-4 dark:bg-gray-700 rounded-md w-full sm:w-2/5 border-2">
      <div className="text-custom-title dark:text-white font-bold border-b-2 p-2">
        Detalles
      </div>
      <div className="mt-3 flex justify-start">
        <div className="text-custom-title dark:text-white font-semibold">
          Actualizada:{" "}
          <span className="font-normal">
            {formatFecha(task ? task.updatedAt : "")}
          </span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-3 justify-start">
        <div className="text-custom-title dark:text-white font-semibold">
          Responsable:
        </div>
        <div className="flex sm:gap-3 items-center">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-custom-second text-white font-bold uppercase">
              {task?.usuarioAsignado.nombre[0]}
              {task?.usuarioAsignado.nombre[1]}
            </AvatarFallback>
          </Avatar>
          <span className="font-normal dark:text-white text-custom-title">
            {task?.usuarioAsignado.nombre}
          </span>
        </div>
      </div>
      <div className="mt-3 flex justify-start">
        <div className="text-custom-title dark:text-white font-semibold">
          Estado: <span className="font-normal">{task?.estado}</span>
        </div>
      </div>
      <div className="mt-3 flex justify-start">
        <div className="text-custom-title dark:text-white font-semibold">
          Prioridad: <span className="font-normal">{task?.prioridad}</span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-3 justify-start">
        <div className="text-custom-title dark:text-white font-semibold">
          Informador:
        </div>
        <div className="flex sm:gap-3 items-center">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-custom-second text-white font-bold uppercase">
              {task?.creador.nombre[0]}
              {task?.creador.nombre[1]}
            </AvatarFallback>
          </Avatar>
          <span className="font-normal dark:text-white text-custom-title">
            {task?.creador.nombre}
          </span>
        </div>
      </div>
      <div className="mt-3 flex justify-start">
        <div className="text-custom-title dark:text-white font-semibold">
          Caduca:{" "}
          <span className="font-normal">
            {formatFecha(task?.fechaFin?.toString())}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetallesComentario;
