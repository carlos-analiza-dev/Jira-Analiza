import { TareasData } from "@/types/tareas.type";
import DropTask from "@/components/DropTask";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import updateStatusTarea from "@/api/tareas/updateStatusTarea";
import { useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import TareasCard from "./TareasCard";

type TareaListProps = {
  tareas: TareasData[];
  check: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
};

type GroupedTasks = {
  [key: string]: TareasData[];
};

const initialStatusGroups: GroupedTasks = {
  Nueva: [],
  Recibida: [],
  EnProgreso: [],
  Finalizada: [],
};

const TaskList = ({ tareas, check, setCheck }: TareaListProps) => {
  const user = useSelector((state: any) => state.auth);
  const { toast } = useToast();

  const groupedTasks = (tareas || []).reduce((acc, task) => {
    let currentGroup = acc[task.estado] ? [...acc[task.estado]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.estado]: currentGroup };
  }, initialStatusGroups);

  const handleDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e;
    if (over && over.id) {
      try {
        const tareaId = active.id.toString();
        const estado = over.id.toString();

        const response = await updateStatusTarea(tareaId, estado, user.token);

        setCheck(!check);
        toast({
          title: "Tarea actualizada exitosamente",
        });
      } catch (error) {
        toast({
          title: "Ocurrio un error al actualizar la tarea",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Ocurrio un error al actualizar la tarea",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <h2 className="text-custom-title dark:text-white font-bold text-xl sm:text-3xl mt-5 text-center">
        Tareas
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 pb-32">
        <DndContext onDragEnd={handleDragEnd}>
          {Object.entries(groupedTasks).map(([estado, tareas]) => (
            <div key={estado} className="w-full">
              <div className="mt-3">
                <div
                  className={`block p-1 ${estado === "Nueva" && "bg-green-500"} ${estado === "Recibida" && "bg-amber-600"} ${estado === "EnProgreso" && "bg-sky-500"} ${estado === "Finalizada" && "bg-red-600"} `}
                />
                <div className="bg-gray-100 ">
                  <p className="p-2 text-custom-title dark:text-white dark:bg-gray-800">
                    {estado === "EnProgreso" ? "En Progreso" : estado}
                  </p>
                </div>
              </div>
              <DropTask estado={estado} />
              <ul className="mt-5 space-y-5">
                {tareas.length === 0 ? (
                  <li className="text-custom-title dark:text-white text-center pt-3">
                    No Hay tareas
                  </li>
                ) : (
                  tareas.map((tarea) => (
                    <TareasCard
                      key={tarea.id}
                      tarea={tarea}
                      check={check}
                      setCheck={setCheck}
                    />
                  ))
                )}
              </ul>
            </div>
          ))}
        </DndContext>
      </div>
    </div>
  );
};

export default TaskList;
