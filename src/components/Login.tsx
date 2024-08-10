export default function LoginSesion() {
  return (
    <form className="w-full block justify-center items-center" action="">
      <div className="mt-5 w-full">
        <label
          htmlFor=""
          className="block text-xl font-semibold text-custom-title"
        >
          Correo Electrónico
        </label>
        <input
          type="email"
          placeholder="example@gmail.com"
          className="p-3 rounded-md shadow w-full sm:w-3/4 mt-3"
          autoFocus
        />
      </div>
      <div className="mt-5 w-full">
        <label
          htmlFor=""
          className="block text-xl font-semibold text-custom-title"
        >
          Contraseña
        </label>
        <input
          type="password"
          placeholder="**************"
          className="p-3 rounded-md shadow w-full sm:w-3/4 mt-3"
          autoFocus
        />
      </div>
      <div className="mt-5 w-full flex justify-center">
        <button
          className="bg-custom-second text-white font-semibold rounded-md shadow hover:bg-red-500
    p-3 w-full sm:w-1/2"
        >
          Iniciar Sesión
        </button>
      </div>
    </form>
  );
}
