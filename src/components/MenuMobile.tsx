import { LogIn, Text, UserRoundPlus } from "lucide-react";
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

const MenuMobile = () => {
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
            <SheetTitle className="text-custom-title font-bold dark:text-white">
              ¿Donde deseas navegar?
            </SheetTitle>
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
            <Separator />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MenuMobile;
