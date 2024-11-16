import { Frown, HeartCrack } from "lucide-react";
interface Props {
  handleCloseModal: () => void;
}
const ModalExpired = ({ handleCloseModal }: Props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-lg font-bold text-red-600">¡Advertencia!</h2>
        <div className="flex gap-2 items-center">
          <p className="text-custom-title">
            Lo sentimos, tu sesion ha expirado.
          </p>
          <HeartCrack className="text-red-600" size={25} />
          <Frown className="text-yellow-700" size={25} />
        </div>
        <div className="mt-4">
          <button
            onClick={handleCloseModal}
            className="py-2 px-4 bg-red-600 text-white rounded-md"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalExpired;
