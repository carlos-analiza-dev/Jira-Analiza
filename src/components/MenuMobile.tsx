import { LogIn, LogOut, Text, UserRoundPlus } from "lucide-react";
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

const MenuMobile = () => {
  const user = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = () => {
    dispatch(clearUser());
    router.push("/");
  };
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          {" "}
          <Button variant="outline">
            <Text />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="text-custom-title font-bold dark:text-white mb-5">
              ¿Donde deseas navegar?
            </SheetTitle>
            {!user?.role && !user?.token && (
              <SheetDescription>
                <div className="flex justify-around mt-3 items-center text-custom-title  dark:text-white">
                  <Link href="/">Iniciar Sesion</Link>

                  <LogIn />
                </div>
                <div className="flex justify-around mt-3 items-centern text-custom-title  dark:text-white">
                  <Link href="/register">Registrarse</Link>
                  <UserRoundPlus />
                </div>
              </SheetDescription>
            )}
            {user && user.role && user.role.nombre === "Administrador" && (
              <div
                onClick={handleLogout}
                className="flex justify-around items-center text-custom-title  dark:text-white"
              >
                <p className="text-custom-title dark:text-white">
                  Cerrar Sesion
                </p>
                <LogOut />
              </div>
            )}
            <Separator />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MenuMobile;
