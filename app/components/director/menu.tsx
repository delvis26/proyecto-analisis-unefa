"use client"
import Link from "next/link";
import { IconCash, IconClockHour9, IconHome, IconListLetters, IconSchool, IconSettings, IconUserScreen, IconUsersGroup } from "@/components/icons";

export default function MenuDirector() {

  return (
    <>
        <li>
          <Link
            className="relative text-black/80 w-full inline-flex px-5 py-2.5 rounded-xl text-base gap-2 items-center bg-black/5 transition-colors"
            href="/home"
          >
            <div className="left-2 w-1 h-7 absolute bg-blue-600 rounded-full"></div>
            <IconHome className="w-6 h-6" />
            Inicio
          </Link>
        </li>
        <li>
          <Link
            className="text-black/80 w-full inline-flex px-5 py-2.5 rounded-xl text-base gap-2 items-center hover:bg-black/5 transition-colors"
            href="/representatives"
          >
            <IconUsersGroup className="w-6 h-6" />
            Representantes
          </Link>
        </li>
        <li>
          <Link
            className="text-black/80 w-full inline-flex px-5 py-2.5 rounded-xl text-base gap-2 items-center hover:bg-black/5 transition-colors"
            href="#"
          >
            <IconSchool className="w-6 h-6" />
            Estudiantes
          </Link>
        </li>
        <li>
          <Link
            className="text-black/80 w-full inline-flex px-5 py-2.5 rounded-xl text-base gap-2 items-center hover:bg-black/5 transition-colors"
            href="#"
          >
            <IconUserScreen className="w-6 h-6" />
            Profesores
          </Link>
        </li>
        <li>
          <Link
            className="text-black/80 w-full inline-flex px-5 py-2.5 rounded-xl text-base gap-2 items-center hover:bg-black/5 transition-colors"
            href="#"
          >
            <IconClockHour9 className="w-6 h-6" />
            Horarios
          </Link>
        </li>
        <li>
          <Link
            className="text-black/80 w-full inline-flex px-5 py-2.5 rounded-xl text-base gap-2 items-center hover:bg-black/5 transition-colors"
            href="#"
          >
            <IconListLetters className="w-6 h-6" />
            Secciones
          </Link>
        </li>
        <li>
          <Link
            className="text-black/80 w-full inline-flex px-5 py-2.5 rounded-xl text-base gap-2 items-center hover:bg-black/5 transition-colors"
            href="#"
          >
            <IconCash className="w-6 h-6" />
            Pagos
          </Link>
        </li>
        <li>
          <Link
            className="text-black/80 w-full inline-flex px-5 py-2.5 rounded-xl text-base gap-2 items-center hover:bg-black/5 transition-colors"
            href="#"
          >
            <IconSettings className="w-6 h-6" />
            Configuración
          </Link>
        </li>
      </>
  );
}
