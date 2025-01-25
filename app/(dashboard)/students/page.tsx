"use client";

import GetStudents from "@/actions/get-students";
import { IconEye, IconSearch } from "@/components/icons";
import TextSkeleton from "@/components/skeleton";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Students {
  id: string;
  fullName: string;
  gender: string;
  status: string;
  course: string;
  createdAt: string;
  representativeId: string;
}

interface User {
  id: string;
  password: string;
  roleUser: string;
  fullName: string;
  gender: string;
  identification: string;
  email: string;
  phone: string;
  adress: string;
  status: string | null;
  createdAt: string;
}

interface DataItem {
  students: Students;
  users: User;
}

export default function Students() {
  const [pending, setPending] = useState(true);
  const [students, setStudents] = useState<DataItem[]>([]);

  useEffect(() => {
    const getData = async () => {
      const res = await GetStudents();

      if (res) {
        setStudents(res);
        setPending(false);
      }
    };

    getData();
  }, []);

  return (
    <>
      <section className="bg-white rounded-xl p-4 border border-black/5 shadow-sm flex flex-col">
        <h1 className="text-center text-xl font-bold mb-4">ESTUDIANTES</h1>
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
            <div>Curso</div>
            <div>Representante</div>
            <div className="flex justify-end">Acciones</div>
          </div>

          {students.map((item, index) => (
            <div
              key={item.students.id}
              className={`flex flex-row items-center *:truncate *:flex-1 px-4 py-2 gap-2 ${
                index !== students.length - 1 && "border-b border-black/10"
              }`}
            >
              <div>{item.students.fullName}</div>
              <div>
                {Number(item.students.course) === 1 && "1er año"}
                {Number(item.students.course) === 2 && "2do año"}
                {Number(item.students.course) === 3 && "3er año"}
                {Number(item.students.course) === 4 && "4to año"}
                {Number(item.students.course) === 5 && "5to año"}
              </div>
              <div>{item.users.fullName}</div>
              <div className="flex justify-end">
                <Link
                  className="p-1 md:px-2 bg-blue-600 hover:bg-blue-800 transition-colors text-white rounded-lg shadow flex justify-center items-center gap-1"
                  href={`students/${item.students.id}`}
                >
                  <IconEye className="w-6 h-6" />
                  <span className="hidden md:block">Visualizar</span>
                </Link>
              </div>
            </div>
          ))}

          {pending === false && students.length === 0 && (
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
