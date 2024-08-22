import {
  CalendarPlus,
  ChartColumnBig,
  HousePlus,
  Shield,
  UserCog,
  Users,
} from "lucide-react";

export const dataSide = [
  {
    id: 1,
    title: "Dashboard",
    link: "/dashboard",
    icon: ChartColumnBig,
  },
  {
    id: 2,
    title: "Usuarios",
    link: "/users",
    icon: Users,
  },
  {
    id: 3,
    title: "Autorizar usuarios",
    link: "/autorizar",
    icon: UserCog,
  },
  {
    id: 4,
    title: "Eventos",
    link: "/eventos",
    icon: CalendarPlus,
  },
  {
    id: 5,
    title: "Roles",
    link: "/roles",
    icon: Shield,
  },
  {
    id: 6,
    title: "Sucursales",
    link: "/sucursales",
    icon: HousePlus,
  },
];
