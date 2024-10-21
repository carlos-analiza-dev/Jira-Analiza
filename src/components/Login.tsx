"use client";
import { PostLoginData } from "@/types/dataPostLogin";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import postLoginUser from "@/api/loginUser";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/auth/sessionSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface Props {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginSesion({ setIsLoading }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();
  const user = useSelector((state: any) => state.auth);
  const [isActive, setIsActive] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostLoginData>();

  const onSubmit = async (data: PostLoginData) => {
    setIsLoading(true);

    setTimeout(async () => {
      try {
        const response = await postLoginUser(data);
        dispatch(setUser(response));
        reset();
      } catch (error) {
        if (error) {
          toast({
            title: "Credenciales Incorrectas, contactate con el administrador.",
            variant: "destructive",
          });
        }
      } finally {
        setIsLoading(false);
      }
    }, 2000);
  };

  useEffect(() => {
    if (user && user.rol && user.rol === "Administrador") {
      router.push("/dashboard");
    } else if (user && user.rol && user.rol !== "Administrador") {
      router.push("/proyectos");
    }
  }, [user, router]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full block justify-center items-center sm:px-5"
    >
      <div className="mt-5 w-full">
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
          className="p-3 rounded-md shadow w-full sm:w-full mt-3"
          autoFocus
        />
        {errors.correo && (
          <p className="text-red-500 mt-2">
            {errors.correo.message?.toString()}
          </p>
        )}
      </div>
      <div className="mt-5 w-full">
        <label
          htmlFor="password"
          className="block text-xl font-semibold text-custom-title dark:text-white"
        >
          Contraseña
        </label>
        <div className="relative w-full sm:w-full mt-3">
          <Input
            {...register("password", {
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
            className="p-3 rounded-md shadow w-full"
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

        {errors.password && (
          <p className="text-red-500 mt-2">
            {errors.password.message?.toString()}
          </p>
        )}
      </div>
      <div className="mt-5 w-full flex justify-center">
        <button
          type="submit"
          className="bg-custom-second text-white font-semibold rounded-md shadow hover:bg-red-500 dark:bg-custom-title dark:hover:bg-custom-title/45
    p-3 w-full"
        >
          Iniciar Sesión
        </button>
      </div>
    </form>
  );
}
