import { Input } from "@/components/ui/input";

const FormConfirmPassword = () => {
  return (
    <>
      <form
        className="w-3/4 justify-center items-center grid grid-cols-1 gap-3"
        action=""
      >
        <div className="mt-5 w-full">
          <label
            htmlFor=""
            className="block text-xl font-semibold text-custom-title"
          >
            Contraseña
          </label>
          <Input
            type="password"
            placeholder="**************"
            className="p-3 rounded-md shadow w-full  mt-2"
          />
        </div>
        <div className="mt-5 w-full">
          <label
            htmlFor=""
            className="block text-xl font-semibold text-custom-title"
          >
            Confirmar Contraseña
          </label>
          <Input
            type="password"
            placeholder="**************"
            className="p-3 rounded-md shadow w-full  mt-2"
          />
        </div>
      </form>
      <div className="mt-5 w-full flex justify-center">
        <button
          className="bg-custom-second text-white font-semibold rounded-md shadow hover:bg-red-500
    p-3 w-full sm:w-1/2"
        >
          Cambiar Contraseña
        </button>
      </div>
    </>
  );
};

export default FormConfirmPassword;
