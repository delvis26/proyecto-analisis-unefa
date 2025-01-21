"use client";
import { navigationLinks } from "@/lib/menu-items";
import { useSideBarStore } from "@/store/sidebar";
import UserContext from "@/store/user-context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";

export default function Sidebar() {
  const { displaySideBarState, closeSideBar } = useSideBarStore(
    (state) => state
  );
  const { roleUser } = useContext(UserContext);
  const pathname = usePathname()

  const handleCloseSideBar = () => closeSideBar()

  return (
    <>
      <div
        onClick={closeSideBar}
        className={`absolute z-[60] bg-black/70 w-full min-h-screen z-40 backdrop-blur-sm transition-opacity duration-300 ${
          displaySideBarState ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>
      <div
        className={`bg-white z-[60] fixed ${
          displaySideBarState ? "left-0" : "-left-full"
        } transition-all duration-300 md:static flex-col gap-5 h-screen max-w-72 w-full items-center py-5 overflow-y-auto flex border-r border-black/10 shadow-sm`}
      >
        <img src="/insignia.png" className="w-32 h-auto" />
        <div className="flex flex-col font-medium self-start w-full h-full">
          <ul className="flex flex-col p-2 gap-2 relative flex-1">
            {navigationLinks.map(({ href, label, icon, type_user }, index) => {
              if (type_user !== roleUser && type_user !== "all") return;

              return (
                <li key={index}>
                  <Link
                    onClick={handleCloseSideBar}
                    className={`relative text-black/80 w-full inline-flex px-5 py-2.5 rounded-xl text-base gap-2 items-center ${pathname.includes(href) ? "bg-black/5" : "hover:bg-black/5"} transition-colors`}
                    href={href}
                  >
                    {pathname.includes(href) && <div className="left-2 w-1 h-7 absolute bg-blue-600 rounded-full"></div>}
                    {icon}
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <span className="text-[11px] text-center text-gray-600">
            Desarrollado por 
            <strong className="text-blue-700"> UNEFA LARA</strong>
          </span>
        </div>
      </div>
    </>
  );
}
