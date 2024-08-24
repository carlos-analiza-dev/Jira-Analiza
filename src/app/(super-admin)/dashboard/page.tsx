import ChartActivos from "./ui/ChartActivos";
import ChartBarras from "./ui/ChartBarras";
import ChartPastel from "./ui/ChartPastel";
import ChartUsuarios from "./ui/ChartUsuarios";

export default function DashBoardPage() {
  return (
    <div className="max-w-3xl sm:max-w-5xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <ChartBarras />
        <ChartUsuarios />
        <ChartPastel />
        <ChartActivos />
      </div>
    </div>
  );
}
