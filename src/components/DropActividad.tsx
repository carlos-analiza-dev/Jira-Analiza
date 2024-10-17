import { useDroppable } from "@dnd-kit/core";
type DropTaskType = {
  estado: string;
};

const DropActividad = ({ estado }: DropTaskType) => {
  const { isOver, setNodeRef } = useDroppable({
    id: estado,
  });

  const style = {
    opacity: isOver ? 0.4 : undefined,
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      className="p-2 border border-dotted border-custom-title mt-3 text-center text-custom-title dark:text-white dark:border-white"
    >
      Soltar actividad aqui
    </div>
  );
};

export default DropActividad;
