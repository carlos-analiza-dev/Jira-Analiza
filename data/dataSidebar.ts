import {
  CalendarClock,
  CalendarPlus,
  ChartColumnBig,
  HousePlus,
  Shield,
  User,
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
    title: "Autorizar",
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
    title: "Proyectos",
    link: "/admin-proyectos",
    icon: CalendarClock,
  },
  {
    id: 6,
    title: "Roles",
    link: "/roles",
    icon: Shield,
  },
  {
    id: 7,
    title: "Sucursales",
    link: "/sucursales",
    icon: HousePlus,
  },
  {
    id: 8,
    title: "Perfil",
    link: "/perfil",
    icon: User,
  },
];
