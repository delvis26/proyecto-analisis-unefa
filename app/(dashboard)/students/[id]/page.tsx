"use client";

import GetStudent from "@/actions/get-student";
import {
  IconCalendarEvent,
  IconCaretDownFilled,
  IconGenderFemale,
  IconGenderMale,
  IconId,
  IconMail,
  IconMapRoute,
  IconPhone,
  IconUser,
  IconUserCircle,
} from "@/components/icons";
import TextSkeleton from "@/components/skeleton";
import { GENDERS, STUDENTS_STATUS, USERS_ROLES } from "@/lib/consts";
import UserContext from "@/store/user-context";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

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

export default function Student() {
  const params = useParams();
  const idParam = params.id as string;

  const [students, setStudents] = useState<DataItem>();
  const [phoneFormated, setPhoneFormated] = useState("");
  const [date, setDate] = useState<string>();
  const [pending, setPending] = useState(true);
  const [showActions, setShowActions] = useState(false);

  const session = useContext(UserContext);

  useEffect(() => {
    const getData = async () => {
      const res = await GetStudent(idParam);
      console.log(res.at(0));

      if (res) {
        setStudents(res.at(0));

        const phoneOperator = res[0].users.phone.slice(0, 4);
        const phoneNumberPartOne = res[0].users.phone.slice(4, 7);
        const phoneNumberPartTwo = res[0].users.phone.slice(7);

        const _phoneFormated = `(${phoneOperator}) ${phoneNumberPartOne}-${phoneNumberPartTwo}`;

        setPhoneFormated(_phoneFormated);
        const dateFormated = new Date(
          res[0].students.createdAt
        ).toLocaleDateString("es-ve");
        setDate(dateFormated);

        setPending(false);
      }
    };

    getData();
  }, []);

  return (
    <>
      <section className="flex flex-col md:flex-row gap-4">
        <div className="p-5 flex flex-col items-center bg-white rounded-xl border border-black/5 shadow-sm flex-1 relative">
          <h3 className="text-center text-xl font-bold mb-4">ESTUDIANTE</h3>
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex gap-2 p-2 border border-gray-400 border-dashed rounded-lg items-center flex-1">
                <IconUser className="w-8 h-8 stroke-gray-500" />
                {students?.students.fullName}
                {pending === true && <TextSkeleton h="27px" />}
              </div>

              <div className="flex gap-2 p-2 border border-gray-400 border-dashed rounded-lg items-center flex-1">
                {pending === false && (
                  <>
                    {students?.students.gender === GENDERS.MALE ? (
                      <IconGenderMale className="w-8 h-8 stroke-blue-600" />
                    ) : (
                      <IconGenderFemale className="w-8 h-8 stroke-pink-600" />
                    )}{" "}
                    {students?.students.gender}
                  </>
                )}
                {pending === true && <TextSkeleton h="27px" />}
              </div>
            </div>

            <div className="flex flex-row gap-4">
              <div className="flex gap-2 p-2 border border-gray-400 border-dashed rounded-lg items-center flex-1">
                <IconCalendarEvent className="w-8 h-8 stroke-gray-500" />
                {date}
                {pending === true && <TextSkeleton h="27px" />}
              </div>

              <div className="flex gap-2 p-2 border border-gray-400 border-dashed rounded-lg items-center flex-1">
                <IconMapRoute className="w-8 h-8 stroke-gray-500" />
                {Number(students?.students.course) === 1 && "1er año"}
                {Number(students?.students.course) === 2 && "2do año"}
                {Number(students?.students.course) === 3 && "3er año"}
                {Number(students?.students.course) === 4 && "4to año"}
                {Number(students?.students.course) === 5 && "5to año"}
                {pending === true && <TextSkeleton h="27px" />}
              </div>
            </div>
          </div>

          <div className="p-2 border border-black/10 mt-2 rounded-lg w-full h-full flex flex-col">
            <h3 className="font-bold">NOTAS</h3>
            {pending === false && (
              <div className="grid grid-cols-2 gap-2">
                {students?.students.status ===
                  STUDENTS_STATUS.PENDUNDER_REVIEW && (
                  <div className="p-2">
                    <h4 className="text-black/50">
                      No posee notas registradas
                    </h4>
                  </div>
                )}
                {students?.students.status !==
                  STUDENTS_STATUS.PENDUNDER_REVIEW && (
                  <>
                    <div className="bg-black/5 p-2 rounded-lg flex flex-row justify-between">
                      <h4 className="font-semibold">Materia</h4>
                      <span>20/20</span>
                    </div>
                    <div className="bg-black/5 p-2 rounded-lg flex flex-row justify-between">
                      <h4 className="font-semibold">Materia</h4>
                      <span>20/20</span>
                    </div>
                    <div className="bg-black/5 p-2 rounded-lg flex flex-row justify-between">
                      <h4 className="font-semibold">Materia</h4>
                      <span>20/20</span>
                    </div>
                    <div className="bg-black/5 p-2 rounded-lg flex flex-row justify-between">
                      <h4 className="font-semibold">Materia</h4>
                      <span>20/20</span>
                    </div>
                    <div className="bg-black/5 p-2 rounded-lg flex flex-row justify-between">
                      <h4 className="font-semibold">Materia</h4>
                      <span>20/20</span>
                    </div>
                  </>
                )}
                <div className="relative">
                  {session.roleUser === USERS_ROLES.DIRECTOR &&
                    students?.students.status === STUDENTS_STATUS.VERIFIED && (
                      <>
                        <button
                          onClick={() => setShowActions(!showActions)}
                          className="border border-black/10 hover:bg-black/10 transition-colors p-2 rounded-lg flex flex-row items-center justify-between w-full"
                        >
                          <span>Acciones</span>
                          <IconCaretDownFilled
                            className={`w-5 h-5 transition-transform duration-300 ${
                              showActions && "rotate-180"
                            }`}
                          />
                        </button>
                        <div
                          className={`absolute top-[110%] w-full bg-white rounded-lg shadow border border-black/10 overflow-hidden ${
                            showActions ? "flex flex-col" : "hidden"
                          }`}
                        >
                          <button className="p-2 border-b border-black/10 w-full text-left hover:bg-black/10 transition-colors">
                            Generar boletin de notas
                          </button>
                          <button className="p-2 border-b border-black/10 w-full text-left hover:bg-black/10 transition-colors">
                            Generar constancia de estudio
                          </button>
                          <button className="p-2 w-full text-left hover:bg-black/10 transition-colors">
                            Notas certificadas
                          </button>
                        </div>
                      </>
                    )}

                  {session.roleUser === USERS_ROLES.TEACHER &&
                    students?.students.status === STUDENTS_STATUS.VERIFIED && (
                      <>
                        <button
                          onClick={() => setShowActions(!showActions)}
                          className="border border-black/10 hover:bg-black/10 transition-colors p-2 rounded-lg flex flex-row items-center justify-between w-full"
                        >
                          <span>Acciones</span>
                          <IconCaretDownFilled
                            className={`w-5 h-5 transition-transform duration-300 ${
                              showActions && "rotate-180"
                            }`}
                          />
                        </button>
                        <div
                          className={`absolute top-[110%] w-full bg-white rounded-lg shadow border border-black/10 overflow-hidden ${
                            showActions ? "flex flex-col" : "hidden"
                          }`}
                        >
                          <button className="p-2 border-b border-black/10 w-full text-left hover:bg-black/10 transition-colors">
                            Cargar notas
                          </button>
                          <button className="p-2 border-b border-black/10 w-full text-left hover:bg-black/10 transition-colors">
                            Cargar asistencias e inasistencias
                          </button>
                        </div>
                      </>
                    )}
                  {students?.students.status !==
                    STUDENTS_STATUS.PENDUNDER_REVIEW &&
                    session.roleUser === USERS_ROLES.REPRESENTATIVE && (
                      <Link
                        href="#"
                        className="border border-black/10 hover:bg-black/10 transition-colors p-2 rounded-lg flex flex-row justify-between w-full"
                      >
                        Ver mas...
                      </Link>
                    )}
                </div>
              </div>
            )}
          </div>

          {session.roleUser === USERS_ROLES.DIRECTOR &&
            students?.students.status === STUDENTS_STATUS.PENDUNDER_REVIEW && (
              <>
                <button className="w-full text-center bg-green-500 text-white p-3 bottom-0 mt-2 rounded-lg hover:bg-green-600 font-semibold transition-colors">
                  Verificar estudiante
                </button>
              </>
            )}
        </div>

        <div className="p-5 flex flex-col items-center bg-white rounded-xl border border-black/5 shadow-sm max-w-96 w-full">
          <h2 className="text-center text-xl font-bold mb-4">REPRESENTANTE</h2>
          <div className="flex flex-col items-center w-full">
            <IconUserCircle className="w-24 h-24 stroke-[0.7px] stroke-gray-500" />
            <h3 className="font-bold uppercase w-full text-center">
              {students?.users.fullName}
              {pending === true && <TextSkeleton h="27px" />}
            </h3>

            <div className="flex flex-col gap-2 w-full mt-2">
              <div className="flex gap-2 p-2 border border-gray-400 border-dashed rounded-lg items-center">
                <IconId className="w-8 h-8 stroke-gray-500" />
                {students?.users.identification}
                {pending === true && <TextSkeleton h="27px" />}
              </div>

              <div className="flex gap-2 p-2 border border-gray-400 border-dashed rounded-lg items-center">
                <IconPhone className="w-8 h-8 stroke-gray-500" />
                {phoneFormated}
                {pending === true && <TextSkeleton h="27px" />}
              </div>

              <div className="flex gap-2 p-2 border border-gray-400 border-dashed rounded-lg items-center">
                <IconMail className="w-8 h-8 stroke-gray-500" />
                {students?.users.email}
                {pending === true && <TextSkeleton h="27px" />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
