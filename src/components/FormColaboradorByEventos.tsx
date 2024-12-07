import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useToast } from "./ui/use-toast";
import { useParams } from "next/navigation";
import useGetUsersByEventoId from "@/api/users/getUsersByEventoId";
import { UserType } from "@/types/user.type";
import { Button } from "./ui/button";
import addColaboradorByEvento from "@/api/eventos/addColaboradorByEvento";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { PaisesData } from "../../data/paisesData";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import useAllDepartamentos from "@/api/roles/getAllDepartamentos";
import { TableRolesData } from "@/types/table.roles.type";
import useGetUsersByRolesEventos from "@/api/users/getUsersByRolEvento";

type PropsForm = {
  onSuccess: () => void;
  check?: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormColaboradorByEventos = ({
  onSuccess,
  setCheck,
  check,
}: PropsForm) => {
  const user = useSelector((state: any) => state.auth);
  const { toast } = useToast();
  const params = useParams();
  const eventoId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [pais, setPais] = useState<string>("");
  const [departamento, setDepartamento] = useState<string>("");
  const { result: departamentos } = useAllDepartamentos(user.token, pais);

  const { result, loading, error } = useGetUsersByRolesEventos(
    user.token,
    pais,
    departamento,
    eventoId
  );

  const [usuariosSeleccionados, setUsuariosSeleccionados] = useState<
    UserType[]
  >([]);

  const agregarColaborador = async () => {
    if (usuariosSeleccionados.length === 0) {
      toast({
        title: "No se ha seleccionado ningún usuario.",
        variant: "destructive",
      });
      return;
    }

    try {
      for (const usuario of usuariosSeleccionados) {
        await addColaboradorByEvento(
          eventoId,
          { userId: usuario.id.toString() },
          user.token
        );
      }
      setCheck(!check);
      onSuccess();
      toast({ title: "Colaborador(es) agregado(s) exitosamente" });
    } catch (error: any) {
      toast({
        title: `${error.response.data ? error.response.data.message : "Ocurrió un error al agregar colaboradores"}`,
        variant: "destructive",
      });
    }
  };

  console.log("RESUSUUS", result);

  return (
    <div>
      <div className="mt-4">
        <div className="flex justify-center">
          <p className="text-custom-title dark:text-white font-semibold">
            Elige el pais de los usuarios a agregar:
          </p>
        </div>
        <div className="mb-4 mt-3 flex justify-center">
          <RadioGroup
            value={pais}
            onValueChange={setPais}
            className="flex gap-5"
            defaultValue="comfortable"
          >
            {PaisesData.map((pais) => (
              <div key={pais.id} className="flex items-center space-x-2">
                <RadioGroupItem value={pais.nombre} id={pais.nombre} />
                <label htmlFor="r1">
                  <Image
                    src={pais.url}
                    alt={pais.nombre}
                    width={35}
                    height={35}
                  />
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="mt-1 w-full">
          <label className="block text-lg font-semibold text-custom-title dark:text-white">
            Departamento
          </label>
          <Select value={departamento} onValueChange={setDepartamento}>
            <SelectTrigger className="p-3 rounded-md shadow w-full mt-1">
              <SelectValue placeholder="-- Seleccione una Opcion --" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Departamento</SelectLabel>
                {departamentos && departamentos.length > 0 ? (
                  departamentos.map((res: TableRolesData) => (
                    <SelectItem key={res.id} value={res.id}>
                      {res.nombre}
                    </SelectItem>
                  ))
                ) : (
                  <p>No hay departamentos disponibles</p>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <label className="mb-3 text-custom-title dark:text-white font-semibold">
          Seleccionar colaboradores
        </label>
        {!loading ? (
          result && result.length > 0 ? (
            <select
              multiple
              className="w-full h-[200px] p-2 border rounded dark:bg-gray-800 dark:text-white"
              onChange={(e) => {
                const options = e.target.options;
                const selectedUsers: UserType[] = [];
                for (let i = 0; i < options.length; i++) {
                  if (options[i].selected) {
                    const selectedUser = result.find(
                      (user: UserType) => user.id === options[i].value
                    );
                    if (selectedUser) selectedUsers.push(selectedUser);
                  }
                }
                setUsuariosSeleccionados(selectedUsers);
              }}
            >
              {result.map((usuario: UserType) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nombre}
                </option>
              ))}
            </select>
          ) : error ? (
            <p className="text-red-500">
              Ocurrio un error al momento de cargar los usuarios.
            </p>
          ) : (
            <p>No se encontraron usuarios disponibles.</p>
          )
        ) : (
          <p>Cargando usuarios...</p>
        )}
      </div>

      <div className="mt-4">
        <Button
          onClick={agregarColaborador}
          className="bg-custom-title dark:bg-white text-white dark:text-custom-title w-full"
        >
          Agregar Colaborador(es)
        </Button>
      </div>
    </div>
  );
};

export default FormColaboradorByEventos;
