import {
  Bell,
  CalendarSearch,
  FileLock2,
  LogIn,
  LogOut,
  PanelsTopLeft,
  Presentation,
  ScreenShareOff,
  Text,
  User,
  UserRoundPlus,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Link from "next/link";
import { Separator } from "./ui/separator";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearUser } from "@/store/auth/sessionSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "./Spinner";
import { dataSide, dataSideManager } from "../../data/dataSidebar";

const MenuMobile = () => {
  const user = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(clearUser());
      router.push("/");
      setIsOpen(false);
      setLoading(false);
    }, 1500);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {loading ? (
        <div className="fixed z-50 inset-0">
          <Spinner />
        </div>
      ) : (
        <>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
              <Button variant="outline">
                <Text />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="max-h-screen overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-custom-title font-bold dark:text-white mb-5">
                  ¿Donde deseas navegar?
                </SheetTitle>
                {!user?.token && (
                  <SheetDescription>
                    <div className="flex justify-around mt-3 items-center text-custom-title dark:text-white">
                      <Link href="/" onClick={handleLinkClick}>
                        {" "}
                        Iniciar Sesión
                      </Link>
                      <LogIn />
                    </div>
                    <div className="flex justify-around mt-3 items-center text-custom-title dark:text-white">
                      <Link href="/register" onClick={handleLinkClick}>
                        {" "}
                        Registrarse
                      </Link>
                      <UserRoundPlus />
                    </div>
                    <div className="flex justify-around mt-3 items-center text-custom-title dark:text-white">
                      <Link href="/register" onClick={handleLinkClick}>
                        {" "}
                        Cambiar contraseña
                      </Link>
                      <FileLock2 />
                    </div>
                  </SheetDescription>
                )}
                {user && user.token && user.rol === "Administrador" && (
                  <div>
                    {dataSide.map((item) => (
                      <Link
                        key={item.id}
                        href={item.link}
                        className="flex justify-between items-center text-custom-title dark:text-white mt-4"
                        onClick={handleLinkClick}
                      >
                        <p className="text-custom-title dark:text-white">
                          {item.title}
                        </p>
                        <item.icon />
                      </Link>
                    ))}
                    <Link
                      href="/reset-password"
                      className="flex justify-between items-center text-custom-title dark:text-white mt-4"
                      onClick={handleLinkClick}
                    >
                      <p className="text-custom-title dark:text-white">
                        Cambiar contraseña
                      </p>
                      <FileLock2 />
                    </Link>
                    <Separator className="mt-5 mb-5" />
                    <div
                      onClick={handleLogout}
                      className="flex justify-between items-center text-custom-title dark:text-white mt-4"
                    >
                      <p className="text-custom-title dark:text-white">
                        Cerrar Sesión
                      </p>
                      <LogOut />
                    </div>
                  </div>
                )}
                {user && user.token && user.rol === "Manager" && (
                  <div>
                    {dataSideManager.map((item) => (
                      <Link
                        key={item.id}
                        href={item.link}
                        className="flex justify-between items-center text-custom-title dark:text-white mt-4"
                        onClick={handleLinkClick}
                      >
                        <p className="text-custom-title dark:text-white">
                          {item.title}
                        </p>
                        <item.icon />
                      </Link>
                    ))}
                    <Link
                      href="/reset-password"
                      className="flex justify-between items-center text-custom-title dark:text-white mt-4"
                      onClick={handleLinkClick}
                    >
                      <p className="text-custom-title dark:text-white">
                        Cambiar contraseña
                      </p>
                      <FileLock2 />
                    </Link>

                    <Separator className="mt-5 mb-5" />
                    <div
                      onClick={handleLogout}
                      className="flex justify-between items-center text-custom-title dark:text-white mt-4"
                    >
                      <p className="text-custom-title dark:text-white">
                        Cerrar Sesión
                      </p>
                      <LogOut />
                    </div>
                  </div>
                )}
                {user?.rol === "User" && (
                  <div>
                    <div>
                      <Link
                        href="/proyectos"
                        className="flex justify-between items-center text-custom-title dark:text-white mt-4"
                        onClick={handleLinkClick}
                      >
                        <p className="text-custom-title dark:text-white">
                          Analiza proyectos
                        </p>
                        <PanelsTopLeft />
                      </Link>
                      <Link
                        href="/proyectos-rechazados"
                        className="flex justify-between items-center text-custom-title dark:text-white mt-4"
                        onClick={handleLinkClick}
                      >
                        <p className="text-custom-title dark:text-white">
                          Proyectos Rechazados
                        </p>
                        <ScreenShareOff />
                      </Link>
                      <Link
                        href="/nuevo-proyecto"
                        className="flex justify-between items-center text-custom-title dark:text-white mt-4"
                        onClick={handleLinkClick}
                      >
                        <p className="text-custom-title dark:text-white">
                          Nuevo proyecto
                        </p>
                        <Presentation />
                      </Link>
                      <Link
                        href="/eventos-users"
                        className="flex justify-between items-center text-custom-title dark:text-white mt-4"
                        onClick={handleLinkClick}
                      >
                        <p className="text-custom-title dark:text-white">
                          Eventos
                        </p>
                        <CalendarSearch />
                      </Link>
                      <Link
                        href="/notificaciones"
                        className="flex justify-between items-center text-custom-title dark:text-white mt-4"
                        onClick={handleLinkClick}
                      >
                        <p className="text-custom-title dark:text-white">
                          Notificaciones
                        </p>
                        <Bell />
                      </Link>
                      <Link
                        href="/profile"
                        className="flex justify-between items-center text-custom-title dark:text-white mt-4 mb-4"
                        onClick={handleLinkClick}
                      >
                        <p className="text-custom-title dark:text-white">
                          Perfil
                        </p>
                        <User />
                      </Link>
                      <Link
                        href="/reset-password"
                        className="flex justify-between items-center text-custom-title dark:text-white mt-4 mb-4"
                        onClick={handleLinkClick}
                      >
                        <p className="text-custom-title dark:text-white">
                          Cambiar contraseña
                        </p>
                        <FileLock2 />
                      </Link>
                    </div>
                    <Separator />
                    <div
                      onClick={handleLogout}
                      className="flex justify-between items-center text-custom-title dark:text-white mt-4"
                    >
                      <p className="text-custom-title dark:text-white">
                        Cerrar Sesión
                      </p>
                      <LogOut />
                    </div>
                  </div>
                )}
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </>
      )}
    </div>
  );
};

export default MenuMobile;
