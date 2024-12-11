import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { Label, Pie, PieChart } from "recharts";
import useGetStatusEventosByUser from "@/api/eventos/getStatusEventosByUser";
import { useEffect, useMemo, useState } from "react";

interface Props {
  id: string;
}

interface Status {
  Aceptado: number;
  Pendiente: number;
  Rechazado: number;
  totaleventos: number;
}

const MetricasUsersEventos = ({ id }: Props) => {
  const { result, error } = useGetStatusEventosByUser(id);
  const [resultados, setResultados] = useState<Status | null>(null);

  useEffect(() => {
    if (result) {
      setResultados(result);
    }
  }, [result]);

  const chartData = useMemo(() => {
    if (!resultados) return [];
    return [
      {
        name: "Aceptado",
        value: resultados.Aceptado,
        fill: "hsl(var(--chart-1))",
      },
      {
        name: "Pendiente",
        value: resultados.Pendiente,
        fill: "hsl(var(--chart-2))",
      },
      {
        name: "Rechazado",
        value: resultados.Rechazado,
        fill: "hsl(var(--chart-3))",
      },
    ];
  }, [resultados]);

  const totalVisitors = useMemo(() => {
    return resultados
      ? resultados.Aceptado + resultados.Pendiente + resultados.Rechazado
      : 0;
  }, [resultados]);

  if (error) {
    return <div>No se encontraron eventos para este usuario</div>;
  }

  if (!resultados) {
    return <div>Loading...</div>;
  }
  return (
    <div className=" w-full">
      <div>
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Estado de Eventos</CardTitle>
            <CardDescription>Estado actual de los eventos</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={{
                Aceptado: { label: "Aceptado", color: "hsl(var(--chart-1))" },
                Pendiente: { label: "Pendiente", color: "hsl(var(--chart-2))" },
                Rechazado: { label: "Rechazado", color: "hsl(var(--chart-3))" },
              }}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalVisitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Eventos
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Total Eventos: {totalVisitors} <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Estado actual basado en datos recientes
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default MetricasUsersEventos;
