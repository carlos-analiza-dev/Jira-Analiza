import { formatFecha } from "@/helpers/formatDate";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ComentariosType } from "@/types/comentarios/comentarios.type";
import { useSelector } from "react-redux";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import eliminarComentario from "@/api/comentarioAct/eliminarComentario";
import actualizarComentario from "@/api/comentarioAct/actualizarComentario";

interface Props {
  comentarios: ComentariosType[];
  setComentarios: React.Dispatch<React.SetStateAction<ComentariosType[]>>;
}

const ComentariosActividad = ({ comentarios, setComentarios }: Props) => {
  const user = useSelector((state: any) => state.auth);
  const { toast } = useToast();
  const [editando, setEditando] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");

  const handleDelete = async (comentarioId: string) => {
    try {
      const response = await eliminarComentario(comentarioId, user.token);
      setComentarios((prevComent) =>
        prevComent.filter((com) => com.id !== comentarioId)
      );
      toast({ title: "Comentario eliminado exitosamente" });
    } catch (error) {
      toast({
        title: "Ocurrió un error al eliminar el comentario",
        variant: "destructive",
      });
    }
  };

  const handleEditClick = (comentarioId: string, contenido: string) => {
    setEditando(true);
    setEditingCommentId(comentarioId);
    setEditedContent(contenido);
  };

  const handleSaveEdit = async () => {
    if (!editedContent.trim()) {
      toast({
        title: "El comentario no puede estar vacío",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await actualizarComentario(
        editingCommentId!,
        { contenido: editedContent },
        user.token
      );

      setComentarios((prevComent) =>
        prevComent.map((comentario) =>
          comentario.id === editingCommentId
            ? { ...comentario, contenido: editedContent }
            : comentario
        )
      );
      setEditando(false);
      setEditingCommentId(null);
      setEditedContent("");
      toast({ title: "Comentario editado exitosamente" });
    } catch (error) {
      toast({
        title: "Ocurrió un error al actualizar el comentario",
        variant: "destructive",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditando(false);
    setEditedContent("");
  };

  return (
    <div className="overflow-y-scroll mt-5 h-[300px]">
      {comentarios.map((comentario: ComentariosType) => (
        <div key={comentario.id}>
          <div className="flex gap-1 sm:gap-3 mt-4 items-center">
            <div>
              <Avatar>
                <AvatarFallback className="bg-custom-second text-white font-bold uppercase">
                  {comentario?.autor?.nombre?.[0] ?? ""}
                  {comentario?.autor?.nombre?.[1] ?? ""}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <p className="text-custom-title dark:text-white font-semibold">
                {comentario?.autor?.nombre ?? "Nombre no disponible"}
              </p>
            </div>
            <div>
              <p className="text-custom-title dark:text-white font-light">
                Creado - {formatFecha(comentario.createdAt)}
              </p>
            </div>
          </div>
          <div className="mt-2">
            {editingCommentId === comentario.id ? (
              <div>
                <input
                  type="text"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="border rounded-md p-2 w-full dark:bg-gray-800 dark:text-white"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={handleSaveEdit}
                    className="bg-blue-500 text-white font-semibold p-2 rounded-md"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-500 text-white font-semibold p-2 rounded-md"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-custom-title dark:text-white font-medium">
                {comentario.contenido}
              </p>
            )}
            {user && comentario?.autor && comentario.autor.id === user.id && (
              <div className="flex gap-2 mt-1">
                {!editando && (
                  <>
                    <p
                      className="text-custom-title dark:text-white font-semibold cursor-pointer hover:underline"
                      onClick={() =>
                        handleEditClick(comentario.id, comentario.contenido)
                      }
                    >
                      Editar
                    </p>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <p className="text-custom-title dark:text-white font-semibold cursor-pointer hover:underline">
                          Eliminar
                        </p>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-custom-title dark:text-white font-bold">
                            ¿Quieres eliminar este comentario?
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-custom-title dark:text-white font-semibold">
                            Una vez eliminado, desaparecerá definitivamente.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="dark:bg-custom-second dark:text-white font-bold">
                            Cancelar
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-custom-title text-white font-bold dark:bg-white dark:text-custom-title"
                            onClick={() => handleDelete(comentario.id)}
                          >
                            Continuar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComentariosActividad;
