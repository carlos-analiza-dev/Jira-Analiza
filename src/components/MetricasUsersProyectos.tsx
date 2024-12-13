import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { TrendingUp } from "lucide-react";
import React, { useEffect, useState, useMemo } from "react";
import useGetStatusProyectosByUser from "@/api/proyectos/getStatusProyectosByUser";
import useGetFinalizadosProyectosByUser from "@/api/proyectos/getFinalizadosProyectosByUser";

interface Props {
  id: string;
}

interface Status {
  Aceptado: number;
  Pendiente: number;
  Rechazado: number;
  totalProyectos: number;
}

interface StatusDataFinalizados {
  creador: number;
  responsable: number;
  total: number;
}

const MetricasUsersProyectos = ({ id }: Props) => {
  const { result, error } = useGetStatusProyectosByUser(id);
  const { result: resultFinalizados, error: errorFinalizado } =
    useGetFinalizadosProyectosByUser(id);
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
    if (resultFinalizados) {
      setFinalizados(resultFinalizados);
    }
  }, [resultFinalizados]);

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

  const chartDataFinal = useMemo(() => {
    if (!resultados) return [];
    return [
      {
        name: "Creador",
        value: finalizados?.creador,
        fill: "hsl(100, 100%, 50%)",
      },
      {
        name: "Responsable",
        value: finalizados?.responsable,
        fill: "hsl(268, 100%, 50%)",
      },
    ];
  }, [finalizados]);

  const totalVisitors = useMemo(() => {
    return resultados
      ? resultados.Aceptado + resultados.Pendiente + resultados.Rechazado
      : 0;
  }, [resultados]);

  const totalVisitorsFinal = useMemo(() => {
    return finalizados ? finalizados.creador + finalizados.responsable : 0;
  }, [finalizados]);

  if (error || errorFinalizado) {
    return (
      <div>
        {error && <p>Error al cargar el estado de proyectos.</p>}
        {errorFinalizado && <p>Error al cargar los proyectos finalizados.</p>}
      </div>
    );
  }

  if (!finalizados) {
    return <div>Loading...</div>;
  }

  if (!resultados) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <Card className="flex flex-col h-full">
          <CardHeader className="items-center pb-0">
            <CardTitle>Estado de Proyectos</CardTitle>
            <CardDescription>Estado actual de los proyectos</CardDescription>
          </CardHeader>
          {resultados.Aceptado === 0 &&
          resultados.Pendiente === 0 &&
          resultados.Pendiente === 0 ? (
            <div className="mt-4 mb-4">
              <p className="text-custom-title dark:text-white font-semibold">
                No se encontraron proyectos en este momento.
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
                                Proyectos
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
              Total Proyectos: {totalVisitors}{" "}
              <TrendingUp className="h-4 w-4" />
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
            <CardTitle>Proyectos finalizados.</CardTitle>
            <CardDescription>
              Se observan los proyectos que se finalizaron como creador y
              responsable de los proyectos.
            </CardDescription>
          </CardHeader>
          {finalizados.creador === 0 && finalizados.responsable === 0 ? (
            <div className="mt-4 mb-4">
              <p className="text-custom-title dark:text-white font-semibold">
                No se encontraron proyectos finalizados.
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
                                Proyectos
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
              Total Proyectos Finalizados: {totalVisitorsFinal}{" "}
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

export default MetricasUsersProyectos;
