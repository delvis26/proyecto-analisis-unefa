import {
  IconHome,
  IconUsersGroup,
  IconSchool,
  IconUserScreen,
  IconClockHour9,
  IconListLetters,
  IconCash,
  IconSettings,
} from "@/components/icons";
import { ReactNode } from "react";
import { USERS_ROLES } from "./consts";

interface NavLink {
  href: string;
  icon: ReactNode;
  label: string;
  type_user: string;
}

export const navigationLinks: NavLink[] = [
  {
    href: "/home",
    icon: <IconHome className="w-6 h-6" />,
    label: "Inicio",
    type_user: "all",
  },
  {
    href: "/representatives",
    icon: <IconUsersGroup className="w-6 h-6" />,
    label: "Representantes",
    type_user: USERS_ROLES.DIRECTOR,
  },
  {
    href: "#",
    icon: <IconSchool className="w-6 h-6" />,
    label: "Estudiantes",
    type_user: USERS_ROLES.DIRECTOR,
  },
  {
    href: "#",
    icon: <IconUserScreen className="w-6 h-6" />,
    label: "Profesores",
    type_user: USERS_ROLES.DIRECTOR,
  },
  {
    href: "/students-represented",
    icon: <IconSchool className="w-6 h-6" />,
    label: "Estudiantes",
    type_user: USERS_ROLES.REPRESENTATIVE,
  },
  {
    href: "#",
    icon: <IconClockHour9 className="w-6 h-6" />,
    label: "Horarios",
    type_user: "all",
  },
  {
    href: "#",
    icon: <IconListLetters className="w-6 h-6" />,
    label: "Secciones",
    type_user: USERS_ROLES.DIRECTOR,
  },
  {
    href: "#",
    icon: <IconCash className="w-6 h-6" />,
    label: "Pagos",
    type_user: USERS_ROLES.DIRECTOR,
  },
  {
    href: "#",
    icon: <IconSettings className="w-6 h-6" />,
    label: "Configuración",
    type_user: USERS_ROLES.DIRECTOR,
  },
  {
    href: "/payments",
    icon: <IconCash className="w-6 h-6" />,
    label: "Pagos",
    type_user: USERS_ROLES.REPRESENTATIVE
  }
];
