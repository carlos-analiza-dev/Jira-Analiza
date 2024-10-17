import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useToast } from "./ui/use-toast";
import { useParams } from "next/navigation";
import useGetUsersByEventoId from "@/api/getUsersByEventoId";
import { UserType } from "@/types/user.type";
import { Button } from "./ui/button";
import addColaboradorByEvento from "@/api/addColaboradorByEvento";

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

  const { result, loading } = useGetUsersByEventoId(eventoId, user.token);

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
      console.log("ERROR AL AGREGAR COLABORADORES", error);

      toast({
        title: `${error.response.data ? error.response.data.message : "Ocurrió un error al agregar colaboradores"}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="mt-4">
        <label className="mb-3 text-custom-title dark:text-white font-semibold">
          Seleccionar colaboradores
        </label>
        {!loading ? (
          result && result.length > 0 ? (
            <select
              multiple
              className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
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
