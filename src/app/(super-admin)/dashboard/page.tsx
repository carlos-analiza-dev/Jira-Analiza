import ChartActivos from "./ui/ChartActivos";
import ChartBarras from "./ui/ChartBarras";
import ChartPastel from "./ui/ChartPastel";
import ChartUsuarios from "./ui/ChartUsuarios";

export default function DashBoardPage() {
  return (
    <div className=" mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="mt-4 w-full">
          <ChartBarras />
        </div>
        <div className="mt-4 w-full">
          {" "}
          <ChartUsuarios />
        </div>
        <div className="mt-4 w-full">
          {" "}
          <ChartPastel />
        </div>
        <div className="mt-4 w-full">
          <ChartActivos />
        </div>
      </div>
    </div>
  );
}
