import { Skeleton } from "./ui/skeleton";

const SkeletonProyectos = () => {
  return (
    <div className="w-full block">
      <div className="mt-3">
        <Skeleton className="h-[250px] rounded-sm" />
      </div>
      <div className="mt-3">
        <Skeleton className="h-[250px] rounded-sm" />
      </div>
      <div className="mt-3">
        <Skeleton className="h-[250px] rounded-sm" />
      </div>
      <div className="mt-3">
        <Skeleton className="h-[250px] rounded-sm" />
      </div>
      <div className="mt-3">
        <Skeleton className="h-[250px] rounded-sm" />
      </div>
    </div>
  );
};

export default SkeletonProyectos;
