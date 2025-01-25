"use client";

import { GetTeachersInfo } from "@/actions/get-teachers-info";
import {
  IconEdit,
  IconGenderFemale,
  IconGenderMale,
  IconId,
  IconMail,
  IconMapPin,
  IconPhone,
  IconUserCircle,
} from "@/components/icons";
import TextSkeleton from "@/components/skeleton";
import { GENDERS, USERS_ROLES } from "@/lib/consts";
import UserContext from "@/store/user-context";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

interface User {
  id: string;
  fullName: string;
  gender: string;
  identification: string;
  email: string;
  phone: string;
  status: string | null;
  adress: string;
}

export default function Teacher() {
  const params = useParams();
  const identification = params.identification as string;

  const [pending, setPending] = useState(true);
  const [teacher, setTeacher] = useState<User>();

  const { roleUser } = useContext(UserContext);

  useEffect(() => {
    const getData = async () => {
      const res = await GetTeachersInfo(identification);

      if (res) {
        const phoneOperator = res.phone.slice(0, 4);
        const phoneNumberPartOne = res.phone.slice(4, 7);
        const phoneNumberPartTwo = res.phone.slice(7);

        const phoneFormated = `(${phoneOperator}) ${phoneNumberPartOne}-${phoneNumberPartTwo}`;

        setTeacher({ ...res, phone: phoneFormated });
        setPending(false);
      }
    };

    getData();
  }, []);

  return (
    <>
      <section className="flex flex-col gap-4">
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="p-5 flex flex-col justify-center gap-2 bg-white rounded-xl border border-black/5 shadow-sm flex-1">
            <div className="flex flex-col md:flex-row gap-4">
              <span className="flex gap-2 p-2 border border-gray-400 border-dashed rounded-lg items-center justify-between flex-1">
                <div className="flex flex-1 gap-2 items-center">
                  <IconId className="w-8 h-8 stroke-gray-500" />
                  {pending === false && `${teacher?.identification}`}
                  {pending === true && <TextSkeleton h="27px" />}
                </div>

                {roleUser ===
                  (USERS_ROLES.DIRECTOR || USERS_ROLES.REPRESENTATIVE) && (
                  <button>
                    <IconEdit className="p-1 w-9 h-9 text-gray-500 hover:bg-black/5 transition-colors rounded-md" />
                  </button>
                )}
              </span>

              <span className="flex gap-2 p-2 border border-gray-400 border-dashed rounded-lg items-center justify-between flex-1">
                <div className="flex flex-1 gap-2 items-center overflow-hidden">
                  {pending === false && (
                    <>
                      {teacher?.gender === GENDERS.MALE ? (
                        <IconGenderMale className="w-8 h-8 stroke-blue-600" />
                      ) : (
                        <IconGenderFemale className="w-8 h-8 stroke-pink-600" />
                      )}{" "}
                      {teacher?.gender}
                    </>
                  )}
                  {pending === true && <TextSkeleton h="27px" />}
                </div>
              </span>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <span className="flex gap-2 p-2 border border-gray-400 border-dashed rounded-lg items-center justify-between flex-1">
                <div className="flex flex-1 gap-2 items-center">
                  <IconPhone className="w-8 h-8 stroke-gray-500" />
                  {pending === false && `${teacher?.phone}`}
                  {pending === true && <TextSkeleton h="27px" />}
                </div>

                {roleUser ===
                  (USERS_ROLES.DIRECTOR || USERS_ROLES.REPRESENTATIVE) && (
                  <button>
                    <IconEdit className="p-1 w-9 h-9 text-gray-500 hover:bg-black/5 transition-colors rounded-md" />
                  </button>
                )}
              </span>

              <span className="flex gap-2 p-2 border border-gray-400 border-dashed rounded-lg items-center justify-between flex-1">
                <div className="flex flex-1 gap-2 items-center overflow-hidden">
                  <IconMail className="w-8 h-8 stroke-gray-500" />
                  {pending === false && `${teacher?.email}`}
                  {pending === true && <TextSkeleton h="27px" />}
                </div>

                {roleUser ===
                  (USERS_ROLES.DIRECTOR || USERS_ROLES.REPRESENTATIVE) && (
                  <button>
                    <IconEdit className="p-1 w-9 h-9 text-gray-500 hover:bg-black/5 transition-colors rounded-md" />
                  </button>
                )}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="flex gap-2 p-2 border border-gray-400 border-dashed rounded-lg items-center justify-between flex-1">
                <div className="flex flex-1 gap-2 items-center overflow-hidden">
                  <IconMapPin className="w-8 h-8 stroke-gray-500" />
                  {pending === false && `${teacher?.adress}`}
                  {pending === true && <TextSkeleton h="27px" />}
                </div>

                {roleUser ===
                  (USERS_ROLES.DIRECTOR || USERS_ROLES.REPRESENTATIVE) && (
                  <button>
                    <IconEdit className="p-1 w-9 h-9 text-gray-500 hover:bg-black/5 transition-colors rounded-md" />
                  </button>
                )}
              </span>
            </div>
          </div>
          <div className="p-5 flex items-center flex-col gap-2 bg-white rounded-xl max-w-96 w-full border border-black/5 shadow-sm relative">
            {roleUser ===
              (USERS_ROLES.DIRECTOR || USERS_ROLES.REPRESENTATIVE) && (
              <button>
                <IconEdit className="p-1 w-9 h-9 text-gray-500 absolute right-0 top-0 m-2 hover:bg-black/5 transition-colors rounded-md" />
              </button>
            )}

            <h1 className="font-bold uppercase text-xl flex flex-col items-center w-full text-center">
              <IconUserCircle className="w-24 h-24 stroke-[0.7px] stroke-gray-500" />
              <span className="w-full">
                {pending === false && `${teacher?.fullName}`}
                {pending === true && <TextSkeleton h="28px" />}
              </span>
            </h1>
          </div>
        </div>

        <div className="h-full px-5 py-0 md:py-5 md:px-0 flex flex-col md:flex-row bg-white rounded-xl border border-black/5 shadow-sm">
          <div className="px-0 py-5 md:py-0 md:px-5 flex flex-col flex-1 gap-2 border-b md:border-b-0 md:border-r border-dashed border-gray-400">
            <h2 className="text-xl font-bold uppercase">MATERIAS IMPARTIDAS</h2>
            <div className="bg-black/5 shadow-sm p-2 rounded-lg flex flex-col md:flex-row">
                <div className="flex-1">Materia</div>
                <div className="flex-1"><strong>Curso:</strong> 1er año</div>
            </div>
            <div className="bg-black/5 shadow-sm p-2 rounded-lg flex flex-col md:flex-row">
                <div className="flex-1">Materia</div>
                <div className="flex-1"><strong>Curso:</strong> 2do año</div>
            </div>
            <div className="bg-black/5 shadow-sm p-2 rounded-lg flex flex-col md:flex-row">
                <div className="flex-1">Materia</div>
                <div className="flex-1"><strong>Curso:</strong> 3er año</div>
            </div>
            <div className="bg-black/5 shadow-sm p-2 rounded-lg flex flex-col md:flex-row">
                <div className="flex-1">Materia</div>
                <div className="flex-1"><strong>Curso:</strong> 4to año</div>
            </div>
            <div className="bg-black/5 shadow-sm p-2 rounded-lg flex flex-col md:flex-row">
                <div className="flex-1">Materia</div>
                <div className="flex-1"><strong>Curso:</strong> 5to año</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
