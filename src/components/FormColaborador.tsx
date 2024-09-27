import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useSelector } from "react-redux";
import postEmailByUser from "@/api/postEmailByUser";
import { CorreoType } from "@/types/correo.post.type";
import { UserType } from "@/types/user.type";
import { useToast } from "./ui/use-toast";
import addColaborador from "@/api/addColaborador";
import { useParams } from "next/navigation";

type PropsForm = {
  onSuccess: () => void;
  check?: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormColaborador = ({ onSuccess, setCheck, check }: PropsForm) => {
  const user = useSelector((state: any) => state.auth);
  const { toast } = useToast();
  const params = useParams();
  const proyectoId = Array.isArray(params.id) ? params.id[0] : params.id;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CorreoType>();
  const [usuario, setUsuario] = useState<UserType | null>(null);

  const onSubmit = async (data: CorreoType) => {
    try {
      const response = await postEmailByUser(data, user.token);
      setUsuario(response as UserType);
    } catch (error: any) {
      toast({
        title:
          `${error.response.data.message}` ||
          "Hubo un error al buscar este usuario",
        variant: "destructive",
      });
    }
  };

  const agregarColaborador = async () => {
    if (!usuario?.id) {
      toast({
        title: "No se ha encontrado un usuario válido para agregar.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await addColaborador(
        proyectoId,
        { userId: usuario.id.toString() },
        user.token
      );
      setCheck(!check);
      onSuccess();
      reset();
      toast({ title: "Colaborador agregado exitosamente" });
    } catch (error: any) {
      if (error.response.data.message) {
        toast({
          title: `${error.response.data.message}`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Ocurrio un error al crear el usuario",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="mt-4">
          <label className="mb-3 text-custom-title dark:text-white font-semibold">
            Correo de integrante
          </label>
          <Input
            {...register("correo", {
              required: "El correo electrónico es obligatorio",
              pattern: {
                value:
                  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                message: "Correo electrónico inválido",
              },
            })}
            type="email"
            className="mt-3"
            placeholder="example@gmail.com"
            autoFocus
          />
          {errors.correo && (
            <p className="text-red-500 mt-2">
              {errors.correo.message?.toString()}
            </p>
          )}
        </div>
        <div className="mt-4">
          <Button
            type="submit"
            className="bg-custom-title dark:bg-white text-white dark:text-custom-title w-full"
          >
            Buscar Colaborador
          </Button>
        </div>
      </form>
      {usuario && (
        <div className="mt-4">
          <div className="flex justify-center">
            <p className="text-custom-title font-bold dark:text-white">
              Resultado:
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-custom-title font-bold dark:text-white">
              {usuario.nombre}
            </p>
            <Button
              onClick={agregarColaborador}
              className="bg-custom-second hover:bg-red-500 text-white dark:bg-white dark:text-custom-title p-2"
            >
              Agregar Colaborador
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default FormColaborador;
