"use client";

import { GetStudentsRepresented } from "@/actions/get-students-represented";
import {
  IconChecks,
  IconClockHour3,
  IconEye,
  IconSearch,
  IconUsersPlus,
} from "@/components/icons";
import TextSkeleton from "@/components/skeleton";
import { STUDENTS_STATUS } from "@/lib/consts";
import UserContext from "@/store/user-context";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

interface Student {
  id: string;
  fullName: string;
  gender: string;
  status: string;
  course: string;
  createdAt: string;
  representativeId: string;
}

export default function StudensRepresented() {
  const [data, setData] = useState<Student[]>([]);
  const [pending, setPending] = useState(true);
  const session = useContext(UserContext);

  const userId = session.id as string;

  useEffect(() => {
    const getData = async () => {
      const res = await GetStudentsRepresented(userId);

      if (res) {
        setData(res);
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
                  onChange={() => console.log("Cambio...")}
                  required
                  name="search"
                  className="w-full pl-10 pr-3 py-2 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
                  type="text"
                  placeholder="Buscar..."
                />
              </div>
            </form>
          </div>

          <div>
            <Link
              className="flex justify-center items-center px-3 py-2 gap-2 bg-blue-600 hover:bg-blue-800 transition-colors rounded-lg shadow text-white text-nowrap"
              href="students-represented/add"
            >
              <IconUsersPlus className="w-6 h-6" />
              Registrar estudiante
            </Link>
          </div>
        </div>

        <div className="flex flex-col text-sm md:text-base">
          <div className="flex flex-row *:truncate *:flex-1 px-4 py-2 gap-2 bg-black/5 font-semibold rounded-lg">
            <div>Nombre completo</div>
            <div>Genero</div>
            <div className="flex justify-center">Status</div>
            <div className="flex justify-end">Acciones</div>
          </div>
        </div>

        <div className="flex flex-col">
          {pending === false &&
            data.map((student) => (
              <div
                key={student.id}
                className="flex flex-row items-center *:truncate *:flex-1 px-4 py-2 gap-2"
              >
                <div>{student.fullName}</div>
                <div>{student.gender}</div>
                <div
                  className={`flex justify-center ${
                    student.status === STUDENTS_STATUS.PENDUNDER_REVIEW
                      ? "bg-yellow-200 text-yellow-600"
                      : "bg-green-200 text-green-600"
                  }  py-1 font-semibold  rounded-lg text-xs md:text-base`}
                >
                  {student.status === STUDENTS_STATUS.PENDUNDER_REVIEW ? (
                    <div className="flex flex-row gap-0.5 items-center">
                      <IconClockHour3 className="w-5 h-5" />
                      En revision
                    </div>
                  ) : (
                    <div className="flex flex-row gap-0.5 items-center">
                      <IconChecks className="w-5 h-5" />
                      Verificado
                    </div>
                  )}
                </div>
                <div className="flex justify-end">
                  <Link
                    className="p-1 md:px-2 bg-blue-600 hover:bg-blue-800 transition-colors text-white rounded-lg shadow flex justify-center items-center gap-1"
                    href={`students/${student.id}`}
                  >
                    <IconEye className="w-6 h-6" />
                    <span className="hidden md:block">Visualizar</span>
                  </Link>
                </div>
              </div>
            ))}

          {pending && (
            <div className="my-2 flex flex-col gap-2 justify-center items-center">
              {Array.from({ length: 10 }, (_, index) => (
                <TextSkeleton key={index} h="40px" />
              ))}
            </div>
          )}

          {pending === false && data.length === 0 && (
            <div className="flex py-2 justify-center items-center">
              Sin resultados
            </div>
          )}
        </div>
      </section>
    </>
  );
}
