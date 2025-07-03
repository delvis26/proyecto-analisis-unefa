"use client";

import GetTeachers from "@/actions/get-teachers";
import { IconEye, IconSearch } from "@/components/icons";
import TextSkeleton from "@/components/skeleton";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from "@/db/schema"

export default function Teachers() {
  const [pending, setPending] = useState(true);
  const [teachers, setTeachers] = useState<User[]>([]);

  useEffect(() => {
    const getData = async () => {
      const res = await GetTeachers();

      if (res) {
        setTeachers(res);
        setPending(false);
      }
    };

    getData();
  }, []);

  return (
    <>
      <section className="bg-white rounded-xl p-4 border border-black/5 shadow-sm flex flex-col">
        <h1 className="text-center text-xl font-bold mb-4">DOCENTES</h1>
        <div className="flex flex-row justify-between gap-4 mb-4">
          <div>
            <form>
              <div className="relative">
                <div className="absolute inset-y-0 ps-3 pointer-events-none flex items-center">
                  <IconSearch className="w-6 h-6 opacity-30 select-none" />
                </div>
                <input
                  onChange={() => console.log("...")}
                  required
                  name="search"
                  className="w-full pl-10 pr-3 py-2 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
                  type="text"
                  placeholder="Buscar..."
                />
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col text-sm md:text-base">
          <div className="flex flex-row *:truncate *:flex-1 px-4 py-2 gap-2 bg-black/5 font-semibold rounded-lg">
            <div>Nombre completo</div>
            <div>Cedula</div>
            <div className="flex justify-end">Acciones</div>
          </div>

          {teachers.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-row items-center *:truncate *:flex-1 px-4 py-2 gap-2 ${
                index !== teachers.length - 1 && "border-b border-black/10"
              }`}
            >
              <div>{item.fullName}</div>
              <div>{item.identification}</div>
              <div className="flex justify-end">
                <Link
                  className="p-1 md:px-2 bg-blue-600 hover:bg-blue-800 transition-colors text-white rounded-lg shadow flex justify-center items-center gap-1"
                  href={`teachers/${item.identification}`}
                >
                  <IconEye className="w-6 h-6" />
                  <span className="hidden md:block">Visualizar</span>
                </Link>
              </div>
            </div>
          ))}

          {pending === false && teachers.length === 0 && (
            <div className="flex py-2 justify-center items-center">
              Sin resultados
            </div>
          )}

          {pending && (
            <div className="my-2 flex flex-col gap-2 justify-center items-center">
              {Array.from({ length: 10 }, (_, index) => (
                <TextSkeleton key={index} h="40px" />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
