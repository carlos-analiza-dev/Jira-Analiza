import { Input } from "@/components/ui/input";

const FormResetPassword = () => {
  return (
    <>
      <form
        className="w-full justify-center items-center grid grid-cols-1 gap-3"
        action=""
      >
        <div className="mt-5 w-full">
          <label
            htmlFor=""
            className="block text-xl font-semibold text-custom-title"
          >
            Correo Electrónico
          </label>
          <Input
            type="email"
            placeholder="example@gmail.com"
            className="p-3 rounded-md shadow w-full  mt-3"
          />
        </div>
      </form>
      <div className="mt-5 w-full flex justify-center">
        <button
          className="bg-custom-second text-white font-semibold rounded-md shadow hover:bg-red-500
    p-3 w-full sm:w-1/2"
        >
          Enviar
        </button>
      </div>
    </>
  );
};

export default FormResetPassword;
