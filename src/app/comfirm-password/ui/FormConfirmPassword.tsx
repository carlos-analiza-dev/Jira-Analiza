"use client";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { FormDataConfirm } from "@/types/confirm-password.type";
import confirmPasswordUpdate from "@/api/confirmPassword";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const FormConfirmPassword = () => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm<FormDataConfirm>();
  const [isActive, setIsActive] = useState(true);
  const [isActiveConfirm, setIsActiveConfirm] = useState(true);

  const onSubmit = async (data: FormDataConfirm) => {
    try {
      const { confirmPassword, ...dataToSend } = data;
      const response = await confirmPasswordUpdate(dataToSend);
      toast({
        title:
          "Contraseña actualizada exitosamente, revisa tu correo electronico",
      });
      reset();
      router.push("/");
    } catch (error) {
      toast({
        title: "Ocurrio un error al momento de actualizar su contraseña",
      });
    }
  };

  const password = watch("nuevaContrasena");

  return (
    <>
      <form
        className="w-full mx-auto justify-center items-center grid grid-cols-1 gap-3 sm:p-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mt-5 w-full ">
          <label
            htmlFor="correo"
            className="block text-xl font-semibold text-custom-title dark:text-white"
          >
            Correo Electrónico
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
            placeholder="example@gmail.com"
            className="p-3 rounded-md shadow w-full mt-3"
          />
          {errors.correo && (
            <p className="text-red-500 mt-2">
              {errors.correo.message?.toString()}
            </p>
          )}
        </div>

        <div className="mt-5 w-full">
          <label
            htmlFor="nuevaContrasena"
            className="block text-xl font-semibold text-custom-title dark:text-white"
          >
            Contraseña
          </label>
          <div className="relative w-full">
            <Input
              {...register("nuevaContrasena", {
                required: "La contraseña es obligatoria",
                pattern: {
                  value:
                    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                  message:
                    "La contraseña debe tener una letra mayúscula, minúscula y un número.",
                },
              })}
              type={isActive ? "password" : "text"}
              placeholder="**************"
              className="p-3 rounded-md shadow w-full mt-2"
            />
            {isActive ? (
              <Eye
                onClick={() => setIsActive(!isActive)}
                size={20}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              />
            ) : (
              <EyeOff
                onClick={() => setIsActive(!isActive)}
                size={20}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              />
            )}
          </div>
          {errors.nuevaContrasena && (
            <p className="text-red-500 mt-2">
              {errors.nuevaContrasena.message}
            </p>
          )}
        </div>

        <div className="mt-5 w-full">
          <label
            htmlFor="confirmPassword"
            className="block text-xl font-semibold text-custom-title dark:text-white"
          >
            Confirmar Contraseña
          </label>
          <div className="relative w-full">
            <Input
              {...register("confirmPassword", {
                required: "Debes confirmar tu contraseña",
                validate: (value) =>
                  value === getValues("nuevaContrasena") ||
                  "Las contraseñas no coinciden",
              })}
              type={isActiveConfirm ? "password" : "text"}
              placeholder="**************"
              className="p-3 rounded-md shadow w-full mt-2"
            />
            {isActiveConfirm ? (
              <Eye
                size={20}
                onClick={() => setIsActiveConfirm(!isActiveConfirm)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              />
            ) : (
              <EyeOff
                size={20}
                onClick={() => setIsActiveConfirm(!isActiveConfirm)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              />
            )}
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 mt-2">
              {errors.confirmPassword.message?.toString()}
            </p>
          )}
        </div>

        <div className="mt-5 w-full flex justify-center">
          <button
            type="submit"
            className="bg-custom-second text-white font-semibold rounded-md shadow hover:bg-red-500 dark:bg-custom-title dark:hover:bg-custom-title/45 p-3 w-full "
          >
            Cambiar Contraseña
          </button>
        </div>
      </form>
    </>
  );
};

export default FormConfirmPassword;
