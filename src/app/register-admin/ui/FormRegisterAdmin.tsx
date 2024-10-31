"use client";
import createUsers from "@/api/users/createUsers";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DataEmpresas } from "../../../../data/empresasData";
import { PaisData } from "@/types/paits.data.type";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { PaisesData } from "../../../../data/paisesData";

const FormRegisterAdmin = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [sexo, setSexo] = useState("");
  const [edad, setEdad] = useState(0);
  const [dni, setDni] = useState("");
  const [direccion, setDireccion] = useState("");
  const [pais, setPais] = useState("");
  const [empresa, setEmpresa] = useState("");

  const [isActive, setIsActive] = useState(true);
  const [isActiveConfirm, setIsActiveConfirm] = useState(true);
  const rolAdmin = "Administrador";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (contrasena !== confirmarContrasena) {
      toast({ title: "Las contrasenas no coinciden", variant: "destructive" });
      return;
    }

    try {
      const response = await createUsers({
        nombre: name,
        correo: correo,
        direccion: direccion,
        dni: dni,
        edad: edad,
        password: contrasena,
        sexo: sexo,
        pais: pais,
        empresa: empresa,
        rol: rolAdmin,
      });
      setName("");
      setCorreo("");
      setContrasena("");
      setDireccion("");
      setDni("");
      setConfirmarContrasena("");
      setSexo("");
      setEdad(0);
      setPais("");
      setSexo("");
      toast({ title: "Usuario Creado Exitosamente, espera la autorizacion" });
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error: any) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error.response.data.message[0]
        : error?.response?.data?.message || "Ocurrió un error inesperado";

      toast({
        title: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <p className="text-custom-title dark:text-white font-semibold">
            Elige el pais en el que te encuentras:
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
        <div className="w-full justify-center items-center grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-3">
          <div className="mt-1 w-full">
            <label
              htmlFor="nombre"
              className="block text-lg font-semibold text-custom-title dark:text-white"
            >
              Nombre Completo
            </label>
            <Input
              id="nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Nombre Completo"
              className="p-3 rounded-md shadow w-full mt-1"
              autoFocus
            />
          </div>
          <div className="mt-1 w-full">
            <label
              htmlFor="correo"
              className="block text-lg font-semibold text-custom-title dark:text-white"
            >
              Correo Electrónico
            </label>
            <Input
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              type="email"
              placeholder="example@gmail.com"
              className="p-3 rounded-md shadow w-full  mt-1"
            />
          </div>
          <div className="mt-1 w-full">
            <label
              htmlFor="password"
              className="block text-lg font-semibold text-custom-title dark:text-white"
            >
              Contraseña
            </label>
            <div className="relative w-full">
              <Input
                id="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                type={isActive ? "password" : "text"}
                placeholder="**************"
                className="p-3 rounded-md shadow w-full  mt-1"
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
          </div>
          <div className="mt-1 w-full">
            <label
              htmlFor="confirmPassword"
              className="block text-lg font-semibold text-custom-title dark:text-white"
            >
              Confirmar Contraseña
            </label>
            <div className="relative w-full">
              <Input
                id="confirmPassword"
                value={confirmarContrasena}
                onChange={(e) => setConfirmarContrasena(e.target.value)}
                type={isActiveConfirm ? "password" : "text"}
                placeholder="**************"
                className="p-3 rounded-md shadow w-full  mt-1"
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
          </div>
          <div className="mt-1 w-full">
            <label className="block text-lg font-semibold text-custom-title dark:text-white">
              Sexo
            </label>
            <Select value={sexo} onValueChange={setSexo}>
              <SelectTrigger className="p-3 rounded-md shadow w-full mt-1">
                <SelectValue placeholder="-- Seleccione una Opcion --" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sexo</SelectLabel>
                  <SelectItem value="M">Masculino</SelectItem>
                  <SelectItem value="F">Femenino</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-1 w-full">
            <label
              htmlFor="edad"
              className="block text-lg font-semibold text-custom-title dark:text-white"
            >
              Edad
            </label>
            <Input
              id="edad"
              value={edad}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value >= 0) {
                  setEdad(value);
                } else {
                  setEdad(0);
                }
              }}
              type="number"
              placeholder="Edad"
              className="p-3 rounded-md shadow w-full mt-1 no-arrows" // clase personalizada
            />
          </div>

          <div className="mt-1 w-full">
            <label
              htmlFor="dni"
              className="block text-lg font-semibold text-custom-title dark:text-white"
            >
              Numero de identificación
            </label>
            <Input
              id="dni"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              type="text"
              placeholder="xxxx-xxxx-xxxx o xxxxxxxx-x"
              className="p-3 rounded-md shadow w-full mt-1"
            />
          </div>
          <div className="mt-1 w-full">
            <label
              htmlFor="direccion"
              className="block text-lg font-semibold text-custom-title dark:text-white"
            >
              Dirección
            </label>
            <Input
              id="direccion"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              type="text"
              placeholder="Direccion"
              className="p-3 rounded-md shadow w-full mt-1"
            />
          </div>
          {/*   <div className="mt-1 w-full">
            <label className="block text-lg font-semibold text-custom-title dark:text-white">
              Pais
            </label>
            <Select value={pais} onValueChange={setPais}>
              <SelectTrigger className="p-3 rounded-md shadow w-full mt-1">
                <SelectValue placeholder="-- Seleccione una Opcion --" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Pais</SelectLabel>
                  {PaisesData && PaisesData.length > 0 ? (
                    PaisesData.map((pais: PaisData) => (
                      <SelectItem key={pais.id} value={pais.nombre}>
                        {pais.nombre}
                      </SelectItem>
                    ))
                  ) : (
                    <p>No hay paises disponibles</p>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div> */}
          <div className="mt-1 w-full">
            <label className="block text-lg font-semibold text-custom-title dark:text-white">
              Empresa
            </label>
            <Select value={empresa} onValueChange={setEmpresa}>
              <SelectTrigger className="p-3 rounded-md shadow w-full mt-1">
                <SelectValue placeholder="-- Seleccione una Opcion --" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Empresa</SelectLabel>
                  {DataEmpresas && DataEmpresas.length > 0 ? (
                    DataEmpresas.map((empresa: PaisData) => (
                      <SelectItem key={empresa.id} value={empresa.nombre}>
                        {empresa.nombre}
                      </SelectItem>
                    ))
                  ) : (
                    <p>No hay empresas disponibles</p>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-5 w-full flex justify-center">
          <button
            type="submit"
            className="bg-custom-second text-white font-semibold rounded-md shadow hover:bg-red-500 dark:bg-custom-title dark:hover:bg-custom-title/45 p-3 w-full"
          >
            Registrarse
          </button>
        </div>
      </form>
    </>
  );
};

export default FormRegisterAdmin;
