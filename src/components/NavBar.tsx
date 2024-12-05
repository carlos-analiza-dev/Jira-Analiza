"use client";
import Image from "next/image";
import Link from "next/link";
import MenuMobile from "./MenuMobile";
import ModeToggle from "./ModeToggle";
import { clearUser } from "@/store/auth/sessionSlice";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Bell, Droplet, FileLock2, LogOut, User } from "lucide-react";
import Spinner from "./Spinner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { PaisesData } from "../../data/paisesData";
import { PaisData } from "@/types/paits.data.type";
import { setCountry } from "@/store/pais/paiseSlice";
import { Separator } from "./ui/separator";
import useGetProjectsResponsable from "@/api/proyectos/getProjectsResponsable";
import { setNotificationCount } from "@/store/notificaciones/notificationSlice";
import useGetEventosResponsable from "@/api/eventos/getEventosesponsable";

export default function NavBar() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth);
  const { result } = useGetProjectsResponsable(user.token);
  const { result: resultEvento } = useGetEventosResponsable(user.token);

  useEffect(() => {
    if (Array.isArray(result) && Array.isArray(resultEvento)) {
      const notificationCount = result.length + resultEvento.length;
      dispatch(setNotificationCount(notificationCount));
    }
  }, [result, resultEvento, dispatch]);

  const notificationCount = useSelector(
    (state: any) => state.notifications.notificationCount
  );
  const selectedCountry = useSelector(
    (state: any) => state.country.selectedCountry
  );

  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const router = useRouter();
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleCountryChange = (value: string) => {
    dispatch(setCountry(value));
  };

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/");
      dispatch(clearUser());
      setLoading(false);
    }, 1500);
  };

  const handleOptionClick = (path: string) => {
    setPopoverOpen(false);
    router.push(path);
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 mx-auto cursor-pointer sm:w-full md:w-full">
      {loading ? (
        <div className="fixed z-50 inset-0">
          <Spinner />
        </div>
      ) : (
        <>
          {user && user.rol === "Manager" && (
            <Link href="/manager-dashboard">
              <Image
                src="/images/analiza_todos.png"
                width={500}
                height={500}
                alt="Logo Analiza"
                className="h-20 w-20"
              />
            </Link>
          )}
          {user && user.rol === "Administrador" && (
            <Link href="/dashboard">
              <Image
                src="/images/analiza_todos.png"
                width={5000}
                height={500}
                alt="Logo Analiza"
                className="h-20 w-20"
              />
            </Link>
          )}{" "}
          {user && user.rol === "User" && (
            <Link href="/proyectos">
              <Image
                src="/images/analiza_todos.png"
                width={500}
                height={500}
                alt="Logo Analiza"
                className="h-20 w-20"
              />
            </Link>
          )}
          {user.length === 0 && (
            <Link href="/">
              <Image
                src="/images/analiza_todos.png"
                width={500}
                height={500}
                alt="Logo Analiza"
                className="h-20 w-20"
              />
            </Link>
          )}
          {user && user.rol && user.rol === "User" && user.token && (
            <NavigationMenu className="hidden sm:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-custom-title dark:text-white font-bold">
                    Analiza Proyectos
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] ">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/proyectos"
                          >
                            <Droplet className="h-6 w-6 text-custom-second" />
                            <div className="mb-2 mt-4 text-lg font-medium text-custom-title dark:text-white">
                              Jira - Analiza
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground dark:text-white">
                              En esta sección puedes observar todos los
                              proyectos en los cuales estás incluido. Disfruta
                              tu experiencia y colabora en tus proyectos.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/nuevo-proyecto" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Nuevo Proyecto
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/eventos-users" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Eventos
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/notificaciones" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      <div
                        className={`relative ${notificationCount > 0 ? "animate-bounce" : ""}`}
                      >
                        <Bell className="text-custom-title dark:text-white" />
                        {notificationCount > 0 && (
                          <div className="absolute top-0 right-0 transform -translate-y-1/2 p-1 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs">
                            {notificationCount}
                          </div>
                        )}
                      </div>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
          {!user?.role && !user?.token ? (
            <div className="ml-auto justify-between gap-2 hidden sm:flex">
              <Link
                className="text-custom-title font-semibold dark:text-white  text-base hover:text-sky-900 hover:underline"
                href="/"
              >
                Iniciar Sesión
              </Link>
              <p className="text-custom-title dark:text-white">|</p>
              <Link
                className="text-custom-title dark:text-white font-semibold text-base hover:text-sky-900 hover:underline"
                href="register"
              >
                Registrarse
              </Link>
            </div>
          ) : (
            <div
              className={`${
                pathname === "/comfirm-password" ||
                pathname === "/register" ||
                pathname === "/" ||
                pathname === "/reset-password"
                  ? "hidden"
                  : "sm:flex gap-3 hidden"
              }`}
            >
              <div className="hidden sm:block">
                <ModeToggle />
              </div>
              {user.rol === "Manager" && (
                <div>
                  <Select
                    onValueChange={handleCountryChange}
                    defaultValue={selectedCountry || ""}
                  >
                    <SelectTrigger className="w-[70px]">
                      <SelectValue placeholder="pais" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Pais</SelectLabel>
                        {PaisesData.map((pais: PaisData) => (
                          <SelectItem key={pais.id} value={pais.nombre}>
                            <Image
                              src={pais.url}
                              alt={pais.nombre}
                              width={25}
                              height={25}
                            />
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
              {user && user.rol === "Administrador" && (
                <Link href="/notificaciones-admin" legacyBehavior passHref>
                  <div className="flex items-center">
                    <div
                      className={`relative ${notificationCount > 0 ? "animate-bounce" : ""}`}
                    >
                      <Bell className="text-custom-title dark:text-white" />
                      {notificationCount > 0 && (
                        <div className="absolute top-0 right-0 transform -translate-y-1/2 p-1 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs">
                          {notificationCount}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              )}
              {user && user.rol === "Manager" && (
                <Link href="/notificaciones-manager" legacyBehavior passHref>
                  <div className="flex items-center">
                    <div
                      className={`relative ${notificationCount > 0 ? "animate-bounce" : ""}`}
                    >
                      <Bell className="text-custom-title dark:text-white" />
                      {notificationCount > 0 && (
                        <div className="absolute top-0 right-0 transform -translate-y-1/2 p-1 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs">
                          {notificationCount}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              )}
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <Avatar>
                    <AvatarImage
                      width={100}
                      height={100}
                      src="/images/perfil.png"
                      alt="perfilPhoto"
                    />
                    <AvatarFallback className="text-custom-title dark:text-white">
                      {user?.nombre ? user?.nombre[0] : "?"}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div
                    className="flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-800 p-2 text-custom-title dark:text-white hover:cursor-pointer"
                    onClick={() =>
                      handleOptionClick(
                        `${user.rol === "Administrador" ? "/perfil" : user.rol === "Manager" ? "/perfil-manager" : "/profile"}`
                      )
                    }
                  >
                    Perfil <User />
                  </div>
                  <div
                    className="flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-800 p-2 text-custom-title dark:text-white hover:cursor-pointer"
                    onClick={() => handleOptionClick("/reset-password")}
                  >
                    Cambiar contraseña <FileLock2 />
                  </div>
                  <Separator className="mt-3 mb-3" />
                  <p
                    onClick={() => {
                      handleLogout();
                      setPopoverOpen(false);
                    }}
                    className="flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2 text-custom-title dark:text-white"
                  >
                    Cerrar Sesión <LogOut />
                  </p>
                </PopoverContent>
              </Popover>
            </div>
          )}
          <div className="sm:hidden flex gap-4 items-center">
            {user && user.rol && user.token && <ModeToggle />}
            {user && user.rol === "Manager" && (
              <div>
                <Select
                  onValueChange={handleCountryChange}
                  defaultValue={selectedCountry || ""}
                >
                  <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder="pais" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Pais</SelectLabel>
                      {PaisesData.map((pais: PaisData) => (
                        <SelectItem key={pais.id} value={pais.nombre}>
                          <Image
                            src={pais.url}
                            alt={pais.nombre}
                            width={25}
                            height={25}
                          />
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}

            <MenuMobile />
          </div>
        </>
      )}
    </div>
  );
}
