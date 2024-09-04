import { TareasData } from "@/types/tareas.type";
import TareasCard from "./TareasCard";
import { boolean } from "zod";

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
  EnProgreso: [],
  Finalizada: [],
};

const TaskList = ({ tareas, check, setCheck }: TareaListProps) => {
  console.log("tareas", tareas);

  const groupedTasks = (tareas || []).reduce((acc, task) => {
    let currentGroup = acc[task.estado] ? [...acc[task.estado]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.estado]: currentGroup };
  }, initialStatusGroups);

  return (
    <>
      <h2 className="text-custom-title dark:text-white font-bold text-xl sm:text-3xl mt-5">
        Tareas
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pb-32">
        {Object.entries(groupedTasks).map(([estado, tareas]) => (
          <div key={estado} className="w-full">
            <div className="mt-3">
              <div
                className={`block p-1 ${estado === "Nueva" && "bg-green-500"} ${estado === "EnProgreso" && "bg-sky-500"} ${estado === "Finalizada" && "bg-red-600"} `}
              />
              <div className="bg-gray-100 ">
                <p className="p-2 text-custom-title dark:text-white dark:bg-gray-800">
                  {estado === "EnProgreso" ? "En Progreso" : estado}
                </p>
              </div>
            </div>
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
      </div>
    </>
  );
};

export default TaskList;
