import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import updateUser from "@/api/users/updateUser";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { ChartNoAxesCombined, Pencil, TrendingDown } from "lucide-react";

import { useSelector } from "react-redux";
import { UserType } from "@/types/user.type";
import FormularioUsuarios from "./FormularioUsuarios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MetricasUsersProyectos from "@/components/MetricasUsersProyectos";
import MetricasUsersEventos from "@/components/MetricasUsersEventos";
import ProyectosFinalizadosByUser from "@/components/ProyectosFinalizadosByUser";
import EventosFinalizadosByUser from "@/components/EventosFinalizadosByUser";
import ProyectosRechazadosByUser from "@/components/ProyectosRechazadosByUser";
import EventosRechazadosByUser from "@/components/EventosRechazadosByUser";

export type UsersTable = {
  users: UserType[];
  check: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
};

const TableUsers = ({ users, check, setCheck }: UsersTable) => {
  const user = useSelector((state: any) => state.auth);

  const { toast } = useToast();

  const [isEdit, setIsEdit] = useState<any>(null);

  const handleToggleActive = async (
    userId: string,
    currentState: number,
    token?: string
  ) => {
    const newState = currentState === 1 ? 0 : 1;
    const updateData = { isActive: newState };

    try {
      const response = await updateUser(userId, updateData, user.token);

      toast({
        title: "La actividad del usuario ha sido actualizada exitosamente",
      });
      setCheck(!check);
    } catch (error) {
      toast({
        title: "Ocurrio un error al actualizar la actividad.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (evento: UserType) => {
    setIsEdit(evento);
  };

  const handleCloseEdit = () => {
    setIsEdit(null);
  };

  if (!users || users.length === 0) {
    return (
      <div className="block">
        <div className="flex justify-center mt-10">
          <Image src="/notfound.svg" alt="NotFound" width={400} height={500} />
        </div>
        <div className="mt-5">
          <p className="text-center font-bold text-custom-title text-2xl dark:text-white">
            No se encontraron usuarios.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Table>
      <TableCaption className="text-custom-title dark:text-white font-bold">
        Lista de Usuarios
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Nombre
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Correo
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Sexo
          </TableHead>

          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Empresa
          </TableHead>

          <TableHead className="text-custom-title dark:text-white font-bold">
            Autorizado
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Estado
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Acciones
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium text-custom-title dark:text-white">
              {user.nombre}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center">
              {user.correo}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center">
              {user.sexo === "M" ? "Masculino" : "Femenino"}
            </TableCell>

            <TableCell className="text-custom-title dark:text-white text-center">
              {user.empresa}
            </TableCell>

            <TableCell className="text-custom-title dark:text-white text-center">
              {user.autorizado ? "Autorizado" : "No autorizado"}
            </TableCell>
            <TableCell className=" text-custom-title dark:text-white text-center">
              {`${user.isActive ? "Activo" : "Inactivo"}`}
            </TableCell>
            <TableCell className=" text-custom-title dark:text-white text-center">
              <div className="flex justify-center items-center gap-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">
                      {user.isActive === 0 ? "Activar" : "Desactivar"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <div className="flex justify-end">
                        <AlertDialogCancel>X</AlertDialogCancel>
                      </div>
                      <AlertDialogTitle className="text-custom-title dark:text-white">
                        ¿Estás seguro de{" "}
                        {user.isActive === 0 ? "activar" : "desactivar"} este
                        usuario?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        ¡Debes estar seguro de esta acción antes de continuar!
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          handleToggleActive(user.id, user.isActive ?? 0)
                        }
                        className="bg-custom-title dark:bg-white dark:text-custom-title font-semibold"
                      >
                        Continuar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="icon"
                      onClick={() => handleEdit(user)}
                      variant="outline"
                    >
                      <Pencil />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <div className="flex justify-end">
                        <AlertDialogCancel>X</AlertDialogCancel>
                      </div>
                      <AlertDialogTitle className="text-custom-title dark:text-white">
                        ¿Estás seguro de editar este usuario?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-custom-title dark:text-white">
                        ¡Debes estar seguro de esta acción antes de continuar!
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="p-2">
                      <FormularioUsuarios
                        usuario={isEdit}
                        check={check}
                        setCheck={setCheck}
                      />
                    </div>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <p className="text-custom-title dark:text-white font-semibold hover:underline cursor-pointer">
                      Ver
                    </p>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-full sm:max-w-5xl h-full md:max-w-7xl">
                    <div className="flex justify-end">
                      <AlertDialogCancel>X</AlertDialogCancel>
                    </div>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-custom-title dark:text-white font-bold">
                        Aqui podras observar las metricas de este usuario.
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-custom-title dark:text-white font-semibold">
                        En esta seccion se podran observar las metricas y podras
                        dar seguimiento a los proyectos y eventos que este
                        usuario esta asignado.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="mt-4 px-4 md:px-8 overflow-y-auto">
                      <Tabs defaultValue="proyectos" className="w-full">
                        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 overflow-x-auto">
                          <TabsTrigger value="proyectos">Proyectos</TabsTrigger>
                          <TabsTrigger value="proyectos-finalizados">
                            Proyectos finalizados
                          </TabsTrigger>
                          <TabsTrigger value="proyectos-rechazados">
                            Proyectos rechazados
                          </TabsTrigger>
                          <TabsTrigger value="eventos">Eventos</TabsTrigger>
                          <TabsTrigger value="eventos-finalizados">
                            Eventos finalizados
                          </TabsTrigger>
                          <TabsTrigger value="eventos-rechazados">
                            Eventos rechazados
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="proyectos">
                          <Card className="p-4 sm:p-6">
                            <CardHeader>
                              <CardTitle>Proyectos</CardTitle>
                              <CardDescription>
                                Metricas de los Proyectos de - {user.nombre}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <MetricasUsersProyectos id={user.id} />
                            </CardContent>
                          </Card>
                        </TabsContent>
                        <TabsContent value="proyectos-finalizados">
                          <Card className="p-4 sm:p-6">
                            <CardHeader>
                              <div className="flex justify-between">
                                <div>
                                  <CardTitle>Proyectos finalizados</CardTitle>
                                  <CardDescription>
                                    Metricas de los Proyectos de - {user.nombre}
                                  </CardDescription>
                                </div>
                                <div className=" h-8 w-8 sm:h-14 sm:w-14 rounded-full bg-gray-200 dark:bg-gray-800 text-custom-title dark:text-white flex justify-center items-center">
                                  <ChartNoAxesCombined />
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <ProyectosFinalizadosByUser id={user.id} />
                            </CardContent>
                          </Card>
                        </TabsContent>
                        <TabsContent value="proyectos-rechazados">
                          <Card className="p-4 sm:p-6">
                            <CardHeader>
                              <div className="flex justify-between">
                                <div>
                                  <CardTitle>Proyectos rechazados</CardTitle>
                                  <CardDescription>
                                    Metricas de los proyectos rechzados de -{" "}
                                    {user.nombre}
                                  </CardDescription>
                                </div>
                                <div className=" h-8 w-8 sm:h-14 sm:w-14 rounded-full bg-gray-200 dark:bg-gray-800 text-custom-title dark:text-white flex justify-center items-center">
                                  <TrendingDown />
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <ProyectosRechazadosByUser id={user.id} />
                            </CardContent>
                          </Card>
                        </TabsContent>
                        <TabsContent value="eventos">
                          <Card className="p-4 sm:p-6">
                            <CardHeader>
                              <CardTitle>Eventos</CardTitle>
                              <CardDescription>
                                Metricas de los Eventos de - {user.nombre}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <MetricasUsersEventos id={user.id} />
                            </CardContent>
                          </Card>
                        </TabsContent>
                        <TabsContent value="eventos-finalizados">
                          <Card className="p-4 sm:p-6">
                            <CardHeader>
                              <div className="flex justify-between">
                                <div>
                                  <CardTitle>Eventos finalizados</CardTitle>
                                  <CardDescription>
                                    Metricas de los Eventos de - {user.nombre}
                                  </CardDescription>
                                </div>
                                <div className=" h-8 w-8 sm:h-14 sm:w-14 rounded-full bg-gray-200 dark:bg-gray-800 text-custom-title dark:text-white flex justify-center items-center">
                                  <ChartNoAxesCombined />
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <EventosFinalizadosByUser id={user.id} />
                            </CardContent>
                          </Card>
                        </TabsContent>
                        <TabsContent value="eventos-rechazados">
                          <Card className="p-4 sm:p-6">
                            <CardHeader>
                              <div className="flex justify-between">
                                <div>
                                  <CardTitle>Eventos rechazados</CardTitle>
                                  <CardDescription>
                                    Metricas de los Eventos de - {user.nombre}
                                  </CardDescription>
                                </div>
                                <div className=" h-8 w-8 sm:h-14 sm:w-14 rounded-full bg-gray-200 dark:bg-gray-800 text-custom-title dark:text-white flex justify-center items-center">
                                  <TrendingDown />
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <EventosRechazadosByUser id={user.id} />
                            </CardContent>
                          </Card>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableUsers;
