import { Skeleton } from "@/components/ui/skeleton";

const SkeletonTableUsers = () => {
  return (
    <div className="w-full block">
      <div className="w-full">
        <Skeleton className="h-[50px] rounded-sm" />
      </div>
      <div className="mt-3">
        <Skeleton className="h-[250px] rounded-sm" />
      </div>
    </div>
  );
};

export default SkeletonTableUsers;
