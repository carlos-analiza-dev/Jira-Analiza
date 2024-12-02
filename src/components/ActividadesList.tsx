import { useSelector } from "react-redux";
import { useToast } from "./ui/use-toast";
import { ActividadesType } from "@/types/actividades.type";
import ActividadesCard from "./ActividadesCard";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import DropActividad from "./DropActividad";
import updateActividad from "@/api/actividades/updateActividad";
import { useEffect, useState } from "react";

type ActividadesListProps = {
  actividades: ActividadesType[];
  check: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
};

type GroupedTasks = {
  [key: string]: ActividadesType[];
};

const initialStatusGroups: GroupedTasks = {
  Nueva: [],
  Recibida: [],
  EnProgreso: [],
  Finalizada: [],
};

const ActividadesList = ({
  actividades,
  check,
  setCheck,
}: ActividadesListProps) => {
  const user = useSelector((state: any) => state.auth);
  const { toast } = useToast();

  const groupedTasks = (actividades || []).reduce((acc, actividad) => {
    let currentGroup = acc[actividad.estado] ? [...acc[actividad.estado]] : [];
    currentGroup = [...currentGroup, actividad];
    return { ...acc, [actividad.estado]: currentGroup };
  }, initialStatusGroups);
  const [actividadesStatus, setActividadesStatus] = useState<
    ActividadesType[] | []
  >([]);
  useEffect(() => {
    if (actividades) {
      setActividadesStatus(actividades);
    }
  }, [actividades]);

  const handleDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e;
    if (over && over.id) {
      try {
        const actividadId = active.id.toString();
        const estado = over.id.toString();

        const response = await updateActividad(
          actividadId,
          { estado },
          user.token
        );

        setCheck(!check);
        toast({
          title: "Actividad actualizada exitosamente",
        });
      } catch (error: any) {
        toast({
          title: error.response.data
            ? error.response.data.message
            : "Ocurrio un error al actualizar la actividad",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Ocurrio un error al actualizar la actividad",
        variant: "destructive",
      });
    }
  };
  return (
    <div>
      <h2 className="text-custom-title dark:text-white font-bold text-xl sm:text-3xl mt-5 text-center">
        Actividades
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 pb-32">
        <DndContext onDragEnd={handleDragEnd}>
          {Object.entries(groupedTasks).map(
            ([estado, actividadesPorEstado]) => (
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
                <DropActividad estado={estado} />
                <ul className="mt-5 space-y-5">
                  {actividadesStatus.length === 0 ? (
                    <li className="text-custom-title dark:text-white text-center pt-3">
                      No Hay actividades
                    </li>
                  ) : (
                    actividadesPorEstado.map((actividad) => (
                      <ActividadesCard
                        key={actividad.id}
                        actividad={actividad}
                        check={check}
                        setCheck={setCheck}
                        setActividadesStatus={setActividadesStatus}
                      />
                    ))
                  )}
                </ul>
              </div>
            )
          )}
        </DndContext>
      </div>
    </div>
  );
};

export default ActividadesList;
