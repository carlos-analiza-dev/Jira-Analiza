"use client";
import resetPassword from "@/api/resetPassword";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface sendEmail {
  correo: string;
}

const FormResetPassword = () => {
  const { toast } = useToast();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<sendEmail>();

  const onSubmit = async (data: sendEmail) => {
    try {
      const response = await resetPassword(data);

      toast({ title: "Solicitud enviada, revisa tu correo electronico" });
      reset();
    } catch (error) {
      toast({
        title: "Ocurrio un error al enviar la solicitud de correo",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <form
        className="w-full  grid grid-cols-1 gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mt-5 w-full ">
          <label
            htmlFor=""
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
            className="p-3 rounded-md shadow w-full  mt-3"
          />

          {errors.correo && (
            <p className="text-red-500 mt-2">
              {errors.correo.message?.toString()}
            </p>
          )}
        </div>
        <div className=" w-full flex justify-center">
          <button
            type="submit"
            className="bg-custom-second text-white font-semibold rounded-md shadow hover:bg-red-500 dark:bg-custom-title dark:hover:bg-custom-title/45
    p-3 w-full "
          >
            Enviar
          </button>
        </div>
      </form>
    </>
  );
};

export default FormResetPassword;
