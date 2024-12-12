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
import useGetFinalizadosEventoByUser from "@/api/eventos/getFinalizadosEventosByUser";

interface Props {
  id: string;
}

interface Status {
  Aceptado: number;
  Pendiente: number;
  Rechazado: number;
  totaleventos: number;
}

interface StatusDataFinalizados {
  creador: number;
  responsable: number;
  total: number;
}

const MetricasUsersEventos = ({ id }: Props) => {
  const { result, error } = useGetStatusEventosByUser(id);
  const { result: res, error: err } = useGetFinalizadosEventoByUser(id);
  const [resultados, setResultados] = useState<Status | null>(null);
  const [finalizados, setFinalizados] = useState<StatusDataFinalizados | null>(
    null
  );

  useEffect(() => {
    if (result) {
      setResultados(result);
    }
  }, [result]);

  useEffect(() => {
    if (res) {
      setFinalizados(res);
    }
  }, [res]);

  const chartDataFinal = useMemo(() => {
    if (!finalizados) return [];
    return [
      {
        name: "Creador",
        value: finalizados.creador || 0,
        fill: "hsl(100, 100%, 50%)",
      },
      {
        name: "Responsable",
        value: finalizados.responsable || 0,
        fill: "hsl(268, 100%, 50%)",
      },
    ];
  }, [finalizados]);

  const chartData = useMemo(() => {
    if (!resultados) return [];
    return [
      {
        name: "Aceptado",
        value: resultados.Aceptado || 0,
        fill: "hsl(var(--chart-1))",
      },
      {
        name: "Pendiente",
        value: resultados.Pendiente || 0,
        fill: "hsl(var(--chart-2))",
      },
      {
        name: "Rechazado",
        value: resultados.Rechazado || 0,
        fill: "hsl(var(--chart-3))",
      },
    ];
  }, [resultados]);

  const totalVisitors = useMemo(() => {
    return resultados
      ? (resultados.Aceptado || 0) +
          (resultados.Pendiente || 0) +
          (resultados.Rechazado || 0)
      : 0;
  }, [resultados]);

  const totalVisitorsFinal = useMemo(() => {
    return finalizados
      ? (finalizados.creador || 0) + (finalizados.responsable || 0)
      : 0;
  }, [finalizados]);

  if (error || err) {
    return <div>No se encontraron eventos para este usuario</div>;
  }

  if (!resultados && !finalizados) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
        <Card className="flex flex-col h-full">
          <CardHeader className="items-center pb-0">
            <CardTitle>Estado de Eventos</CardTitle>
            <CardDescription>Estado actual de los eventos</CardDescription>
          </CardHeader>
          {resultados?.Aceptado === 0 &&
          resultados.Pendiente === 0 &&
          resultados.Rechazado === 0 ? (
            <div className="mt-4 mb-4">
              <p className="text-custom-title dark:text-white font-semibold">
                No se encontraron eventos en este momento.
              </p>
            </div>
          ) : (
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={{
                  Aceptado: { label: "Aceptado", color: "hsl(var(--chart-1))" },
                  Pendiente: {
                    label: "Pendiente",
                    color: "hsl(var(--chart-2))",
                  },
                  Rechazado: {
                    label: "Rechazado",
                    color: "hsl(var(--chart-3))",
                  },
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
          )}

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
      <div>
        <Card className="flex flex-col h-full">
          <CardHeader className="items-center pb-0">
            <CardTitle>Eventos finalizados.</CardTitle>
            <CardDescription>
              Se observan los eventos que se finalizaron como creador y
              responsable de los eventos.
            </CardDescription>
          </CardHeader>
          {finalizados?.creador === 0 && finalizados?.responsable === 0 ? (
            <div className="mt-4 mb-4">
              <p className="text-custom-title dark:text-white font-semibold">
                No se encontraron eventos finalizados.
              </p>
            </div>
          ) : (
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={{
                  Creador: { label: "Creador", color: "hsl(var(--chart-1))" },
                  Responsble: {
                    label: "Responsable",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={chartDataFinal}
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
                                {totalVisitorsFinal.toLocaleString()}
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
          )}

          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Total eventos Finalizados: {totalVisitorsFinal}{" "}
              <TrendingUp className="h-4 w-4" />
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
