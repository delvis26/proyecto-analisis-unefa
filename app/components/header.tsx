"use client";

import Link from "next/link";
import {
  IconBell,
  IconLogout,
  IconMenu2,
  IconUserCircle,
  IconUserScan,
} from "./icons";
import { SignOut } from "@/actions/sign-out";
import { useSideBarStore } from "@/store/sidebar";
import { useContext } from "react";
import UserContext from "@/store/user-context";

export default function Header() {
  const { openSideBar } = useSideBarStore((state) => state);
  const { fullName } = useContext(UserContext)

  return (
    <header className="sticky top-0 md:static flex flex-row p-5 justify-between items-center w-full bg-white gap-2 border-b border-black/5 shadow-sm z-50">
      <div className="flex flex-row items-center">
        <button onClick={openSideBar} className="md:hidden">
          <IconMenu2 className="w-8 h-8 opacity-70" />
        </button>
      </div>
      <div className="flex flex-row items-center gap-2 relative">
        <span className="text-black/80">
          Bienvenido, <strong>{fullName?.split(" ").at(0)}</strong>
        </span>
        <div className="relative flex items-center group">
          <button>
            <IconUserCircle className="w-8 h-8" />
          </button>

          <div className="z-50 absolute pointer-events-none opacity-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 top-9 right-0 bg-white shadow-md rounded-lg border border-black/10 overflow-hidden transition-opacity duration-200">
            <ul className="flex flex-col justify-center">
              <li>
                <Link
                  className="px-6 py-3 flex flex-row border-b border-black/10 gap-2 text-black/80 hover:bg-black/5 transition-colors"
                  href="#"
                >
                  <IconUserScan className="w-6 h-6" />
                  Mi perfil
                </Link>
              </li>
              <li>
                <button
                  onClick={SignOut}
                  className="px-6 py-3 flex flex-row gap-2 text-nowrap text-black/80 hover:bg-black/5 transition-colors"
                >
                  <IconLogout className="w-6 h-6" />
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
        </div>

        <button className="text-black/80">
          <IconBell className="w-8 h-8" />
        </button>
      </div>
    </header>
  );
}
