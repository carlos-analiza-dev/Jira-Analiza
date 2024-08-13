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

const FormRegister = () => {
  return (
    <>
      <form
        className="w-full justify-center items-center grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-3"
        action=""
      >
        <div className="mt-2 w-full">
          <label
            htmlFor=""
            className="block text-lg font-semibold text-custom-title"
          >
            Nombre Completo
          </label>
          <Input
            type="text"
            placeholder="Nombre Completo"
            className="p-3 rounded-md shadow w-full mt-2"
            autoFocus
          />
        </div>
        <div className="mt-2 w-full">
          <label
            htmlFor=""
            className="block text-lg font-semibold text-custom-title"
          >
            Correo Electrónico
          </label>
          <Input
            type="email"
            placeholder="example@gmail.com"
            className="p-3 rounded-md shadow w-full  mt-2"
          />
        </div>
        <div className="mt-2 w-full">
          <label
            htmlFor=""
            className="block text-lg font-semibold text-custom-title"
          >
            Contraseña
          </label>
          <Input
            type="password"
            placeholder="**************"
            className="p-3 rounded-md shadow w-full  mt-2"
          />
        </div>
        <div className="mt-2 w-full">
          <label
            htmlFor=""
            className="block text-lg font-semibold text-custom-title"
          >
            Confirmar Contraseña
          </label>
          <Input
            type="password"
            placeholder="**************"
            className="p-3 rounded-md shadow w-full  mt-2"
          />
        </div>
        <div className="mt-2 w-full">
          <label className="block text-lg font-semibold text-custom-title">
            Sexo
          </label>
          <Select>
            <SelectTrigger className="p-3 rounded-md shadow w-full mt-2">
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
        <div className="mt-2 w-full">
          <label
            htmlFor=""
            className="block text-lg font-semibold text-custom-title"
          >
            Edad
          </label>
          <Input
            type="text"
            placeholder="Edad"
            className="p-3 rounded-md shadow w-full mt-2"
          />
        </div>
        <div className="mt-2 w-full">
          <label
            htmlFor=""
            className="block text-lg font-semibold text-custom-title"
          >
            DNI
          </label>
          <Input
            type="text"
            placeholder="DNI"
            className="p-3 rounded-md shadow w-full mt-2"
          />
        </div>
        <div className="mt-2 w-full">
          <label
            htmlFor=""
            className="block text-lg font-semibold text-custom-title"
          >
            Dirección
          </label>
          <Input
            type="text"
            placeholder="Direccion"
            className="p-3 rounded-md shadow w-full mt-2"
          />
        </div>
        <div className="mt-2 w-full">
          <label
            htmlFor=""
            className="block text-lg font-semibold text-custom-title"
          >
            Rol
          </label>
          <Select>
            <SelectTrigger className="p-3 rounded-md shadow w-full mt-2">
              <SelectValue placeholder="-- Seleccione una Opcion --" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Rol</SelectLabel>
                <SelectItem value="Admin">Admnistrador</SelectItem>
                <SelectItem value="Gerente">Gerente</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-2 w-full">
          <label
            htmlFor=""
            className="block text-lg font-semibold text-custom-title"
          >
            Sucursal
          </label>
          <Select>
            <SelectTrigger className="p-3 rounded-md shadow w-full mt-2">
              <SelectValue placeholder="-- Seleccione una Opcion --" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sucursal</SelectLabel>
                <SelectItem value="Comayagua">Comayagua</SelectItem>
                <SelectItem value="TGU">Tegucigalpa</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </form>
      <div className="mt-5 w-full flex justify-center">
        <button
          className="bg-custom-second text-white font-semibold rounded-md shadow hover:bg-red-500
    p-3 w-full sm:w-1/2"
        >
          Registrarse
        </button>
      </div>
    </>
  );
};

export default FormRegister;
