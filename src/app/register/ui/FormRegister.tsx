"use client";
import createUsers from "@/api/createUsers";
import useAllDepartamentos from "@/api/getAllDepartamentos";
import useAllSucursales from "@/api/getSucursalesNotPagination";
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
import { SucursalData } from "@/types/sucursal.type";
import { TableRolesData } from "@/types/table.roles.type";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FormRegister = () => {
  const router = useRouter();
  const { result } = useAllDepartamentos();
  const { resultSucursal } = useAllSucursales();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [sexo, setSexo] = useState("");
  const [edad, setEdad] = useState(0);
  const [dni, setDni] = useState("");
  const [direccion, setDireccion] = useState("");
  const [roleId, setRoleId] = useState("");
  const [sucursalId, setSucursalId] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isActiveConfirm, setIsActiveConfirm] = useState(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (contrasena !== confirmarContrasena) {
      toast({ title: "Las contrasenas no coinciden", variant: "destructive" });
      return;
    }

    if (!roleId) {
      toast({
        title: "El campo 'Rol' es obligatorio",
        variant: "destructive",
      });
      return;
    }

    if (!sucursalId) {
      toast({
        title: "El campo 'Sucursal' es obligatorio",
        variant: "destructive",
      });
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
        roleId: roleId,
        sucursalId: sucursalId,
      });
      setName("");
      setCorreo("");
      setContrasena("");
      setDireccion("");
      setDni("");
      setConfirmarContrasena("");
      setSexo("");
      setEdad(0);
      setRoleId("");
      setSucursalId("");
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
            <label className="block text-lg font-semibold text-custom-title dark:text-white">
              Departamento
            </label>
            <Select value={roleId} onValueChange={setRoleId}>
              <SelectTrigger className="p-3 rounded-md shadow w-full mt-1">
                <SelectValue placeholder="-- Seleccione una Opcion --" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Departamento</SelectLabel>
                  {result && result.length > 0 ? (
                    result.map((res: TableRolesData) => (
                      <SelectItem key={res.id} value={res.id}>
                        {res.nombre}
                      </SelectItem>
                    ))
                  ) : (
                    <p>No hay roles disponibles</p>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-1 w-full">
            <label className="block text-lg font-semibold text-custom-title dark:text-white">
              Sucursal
            </label>
            <Select value={sucursalId} onValueChange={setSucursalId}>
              <SelectTrigger className="p-3 rounded-md shadow w-full mt-1">
                <SelectValue placeholder="-- Seleccione una Opcion --" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sucursal</SelectLabel>
                  {resultSucursal && resultSucursal.length > 0 ? (
                    resultSucursal.map((sucursal: SucursalData) => (
                      <SelectItem key={sucursal.id} value={sucursal.id}>
                        {sucursal.nombre}
                      </SelectItem>
                    ))
                  ) : (
                    <p>No hay sucursales disponibles</p>
                  )}
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
              className="p-3 rounded-md shadow w-full mt-1"
            />
          </div>
          <div className="mt-1 w-full">
            <label
              htmlFor="dni"
              className="block text-lg font-semibold text-custom-title dark:text-white"
            >
              DNI
            </label>
            <Input
              id="dni"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              type="text"
              placeholder="DNI"
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

export default FormRegister;
