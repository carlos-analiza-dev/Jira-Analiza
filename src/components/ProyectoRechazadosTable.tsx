import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
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
} from "./ui/alert-dialog";
import { Pencil, Trash2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { TypeProyectos } from "@/types/proyectos.type";
import { UserType } from "@/types/user.type";
import updateProyecto from "@/api/proyectos/updateProyecto";
import { useSelector } from "react-redux";
import { toast } from "./ui/use-toast";
import postEmailByUser from "@/api/users/postEmailByUser";
import { CorreoType } from "@/types/correo.post.type";
import deleteProyecto from "@/api/proyectos/deleteProyecto";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Props {
  proyectos: TypeProyectos[];
  check: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProyectoRechazadosTable = ({ proyectos, check, setCheck }: Props) => {
  const user = useSelector((state: any) => state.auth);
  const [editingProject, setEditingProject] = useState<TypeProyectos | null>(
    null
  );
  const [correo, setCorreo] = useState<string | null>(null);
  const [responsableId, setResponsableId] = useState<UserType | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("no");
  const [mostrar, setMostrar] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [proyectosRejectes, setProyectosRejectes] = useState<TypeProyectos[]>(
    []
  );

  useEffect(() => {
    if (proyectos) {
      setProyectosRejectes(proyectos);
    }
  }, [proyectos]);

  const handleEdit = (project: TypeProyectos) => {
    setEditingProject(project);
    setStatus(project.statusProject);
  };

  const handleSave = async () => {
    if (!editingProject) return;

    try {
      const res = await updateProyecto(
        editingProject.id,
        {
          statusProject: status,
          responsableId: responsableId?.id,
        },
        user.token
      );
      setCheck(!check);
      window.location.reload();
      setEditingProject(null);
      setCorreo(null);
      setResponsableId(null);
      setSelectedOption("no");
      setMostrar(false);
      toast({ title: "Proyecto actualizado correctamente." });
    } catch (error) {
      toast({ title: "Error al guardar el proyecto.", variant: "destructive" });
    }
  };

  const handleSearchResponsable = async () => {
    if (!correo) {
      toast({ title: "Ingrese un correo válido.", variant: "destructive" });
      return;
    }

    try {
      const response = await postEmailByUser(
        { correo } as CorreoType,
        user.token
      );

      if (response) {
        setResponsableId(response);
        toast({ title: `Responsable encontrado: ${response.nombre}` });
      } else {
        toast({
          title: "No se encontró el usuario con el correo proporcionado.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error al encontrar el usuario.",
        variant: "destructive",
      });
    }
  };

  const resetStates = () => {
    setEditingProject(null);
    setCorreo(null);
    setResponsableId(null);
    setSelectedOption("no");
    setMostrar(false);
  };

  const handleCancel = () => {
    resetStates();
  };

  const handleDeleteProyecto = async (proyectoId: string) => {
    try {
      const res = await deleteProyecto(proyectoId, user.token);
      console.log("RES DELE", res);
      setProyectosRejectes((proyect) =>
        proyect.filter((p) => p.id !== proyectoId)
      );
      toast({ title: "Proyecto eliminaddo correctamente." });
    } catch (error) {
      console.log("ELIMINAR ERROR");

      toast({
        title: "Error al eliminar el proyecto.",
        variant: "destructive",
      });
    }
  };

  if (!proyectosRejectes || proyectosRejectes.length === 0) {
    return (
      <div className="mt-5 flex justify-center items-center text-center w-full">
        <p className="text-custom-title dark:text-white font-bold text-3xl">
          No se encontraron proyectos rechazados.
        </p>
      </div>
    );
  }

  return (
    <Table className="mt-3">
      <TableCaption className="text-center text-custom-title dark:text-white font-bold">
        Lista de proyectos rechazados.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Proyecto
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Descripcion
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Estado
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Justificacion
          </TableHead>
          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Responsable
          </TableHead>

          <TableHead className="text-center text-custom-title dark:text-white font-bold">
            Acciones
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {proyectosRejectes.map((proyecto) => (
          <TableRow key={proyecto.id}>
            <TableCell className="text-custom-title dark:text-white text-center font-medium">
              {proyecto.nombre}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center font-medium">
              {proyecto.descripcion}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center font-medium">
              {proyecto.statusProject}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center font-medium">
              {proyecto.justificacion}
            </TableCell>
            <TableCell className="text-custom-title dark:text-white text-center font-medium">
              {proyecto.responsable?.nombre || "N/A"}
            </TableCell>

            <TableCell className="text-custom-title dark:text-white text-center font-medium">
              <div className="flex justify-around gap-3 sm:gap-0">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Pencil
                      onClick={() => handleEdit(proyecto)}
                      className="cursor-pointer"
                    />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-custom-title dark:text-white font-bold">
                        ¿Estas seguro de editar este proyecto?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-custom-title dark:text-white font-medium">
                        En esta sección podrás editar tu proyecto rechazado.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-custom-title dark:text-white">
                          Estado del Proyecto
                        </label>
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="w-full border rounded px-2 py-2 dark:bg-gray-800 mt-2"
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="Rechazado">Rechazado</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-custom-title dark:text-white">
                          Asignar nuevo responsable
                        </label>
                        <RadioGroup
                          className="flex"
                          value={selectedOption}
                          onValueChange={(value) => {
                            setSelectedOption(value);
                            setMostrar(value === "si");
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="si" id="r1" />
                            <label htmlFor="r1">Sí</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="r2" />
                            <label htmlFor="r2">No</label>
                          </div>
                        </RadioGroup>
                        {mostrar && (
                          <>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center w-full gap-2 mt-2">
                                <Input
                                  type="email"
                                  placeholder="Correo del responsable"
                                  value={correo || ""}
                                  onChange={(e) => setCorreo(e.target.value)}
                                  className="w-full border rounded px-2 py-1 dark:bg-gray-800"
                                />
                                <Button
                                  onClick={handleSearchResponsable}
                                  className="bg-custom-title dark:bg-white dark:text-custom-title font-semibold text-white  rounded"
                                >
                                  Buscar
                                </Button>
                              </div>
                            </div>
                            <div className="mt-2">
                              <label className="block text-sm font-medium text-custom-title dark:text-white">
                                Nuevo Responsable
                              </label>
                              <Input
                                type="text"
                                value={responsableId?.nombre || ""}
                                disabled
                                className="w-full border rounded px-2 py-1 dark:bg-gray-800 mt-2"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel
                        onClick={handleCancel}
                        className="font-semibold"
                      >
                        Cancelar
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleSave}
                        className="bg-custom-title dark:bg-white text-white dark:text-custom-title font-semibold"
                      >
                        Continuar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Trash2 className="cursor-pointer" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-custom-title dark:text-white font-bold">
                        ¿Estás seguro de eliminar este proyecto?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-custom-title dark:text-white font-medium">
                        Una vez ejecutes esta acción, no se podrá revertir.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="font-semibold">
                        Cancelar
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteProyecto(proyecto.id)}
                        className="bg-custom-title dark:bg-white text-white dark:text-custom-title font-semibold"
                      >
                        Continuar
                      </AlertDialogAction>
                    </AlertDialogFooter>
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

export default ProyectoRechazadosTable;
