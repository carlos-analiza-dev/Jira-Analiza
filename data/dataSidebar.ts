import {
  Bell,
  Building2,
  CalendarClock,
  CalendarPlus,
  CalendarSearch,
  ChartColumnBig,
  FolderKanban,
  HousePlus,
  Presentation,
  ScreenShareOff,
  Shield,
  SquareX,
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
    title: "Eventos Rechazados",
    link: "/rechazados-admin-eventos",
    icon: SquareX,
  },
  {
    id: 6,
    title: "Proyectos",
    link: "/admin-proyectos",
    icon: CalendarClock,
  },
  {
    id: 7,
    title: "Crear Proyecto",
    link: "/create",
    icon: Presentation,
  },
  {
    id: 8,
    title: "Proyectos Rechazados",
    link: "/proyectos-rechazados-admin",
    icon: ScreenShareOff,
  },
  {
    id: 9,
    title: "Departamentos",
    link: "/roles",
    icon: Shield,
  },
  {
    id: 10,
    title: "Empresas",
    link: "/empresas",
    icon: Building2,
  },
  {
    id: 11,
    title: "Sucursales",
    link: "/sucursales",
    icon: HousePlus,
  },
  {
    id: 12,
    title: "Notificaciones",
    link: "/notificaciones-admin",
    icon: Bell,
  },
  {
    id: 13,
    title: "Perfil",
    link: "/perfil",
    icon: User,
  },
];

export const dataSideManager = [
  {
    id: 1,
    title: "Dashboard",
    link: "/manager-dashboard",
    icon: ChartColumnBig,
  },
  {
    id: 2,
    title: "Usuarios",
    link: "/users-manager",
    icon: Users,
  },
  {
    id: 3,
    title: "Autorizar",
    link: "/autorizar-manager",
    icon: UserCog,
  },
  {
    id: 4,
    title: "Eventos",
    link: "/eventos-manager",
    icon: CalendarPlus,
  },
  {
    id: 5,
    title: "Eventos Asignados",
    link: "/eventos-asignados",
    icon: CalendarSearch,
  },
  {
    id: 6,
    title: "Eventos Rechazados",
    link: "/eventos-rechazados-manager",
    icon: SquareX,
  },
  {
    id: 7,
    title: "Proyectos",
    link: "/proyectos-manager",
    icon: CalendarClock,
  },

  {
    id: 8,
    title: "Proyectos Asignados",
    link: "/asignados-proyectos",
    icon: FolderKanban,
  },
  {
    id: 9,
    title: "Proyectos Rechazados",
    link: "/proyectos-rechazados-manager",
    icon: ScreenShareOff,
  },
  {
    id: 10,
    title: "Departamentos",
    link: "/departamentos-manager",
    icon: Shield,
  },
  {
    id: 11,
    title: "Empresas",
    link: "/empresas-manager",
    icon: Building2,
  },
  {
    id: 12,
    title: "Sucursales",
    link: "/sucursales-manager",
    icon: HousePlus,
  },
  {
    id: 13,
    title: "Notificaciones",
    link: "/notificaciones-manager",
    icon: Bell,
  },
  {
    id: 14,
    title: "Perfil",
    link: "/perfil-manager",
    icon: User,
  },
];
