import { Text } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Link from "next/link";

const MenuMobile = () => {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Text />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96">
          <Link className="block" href="/">
            Iniciar Sesion
          </Link>
          <Link className="mt-2" href="/register">
            Registrarse
          </Link>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MenuMobile;
