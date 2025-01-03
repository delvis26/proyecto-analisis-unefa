"use client";

import { GetRepresentativesInfo } from "@/actions/get-representatives-info";
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
import { GENDERS, REPRESENTATIVES_STATUS, USERS_ROLES } from "@/lib/consts";
import UserContext from "@/store/user-context";
import { redirect, useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

interface Representative {
  fullName: string;
  identification: string;
  gender: string;
  email: string;
  phone: string;
  status: string | null;
  adress: string;
}

export default function Representative() {
  const params = useParams();
  const identification = params.identification as string;
  const [data, setData] = useState<Representative>();
  const [pendingData, setPendingData] = useState(true);
  const { roleUser } = useContext(UserContext);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const representativeInfo = await GetRepresentativesInfo(identification);

        if (representativeInfo) {
          const phoneOperator = representativeInfo.phone.slice(0, 4);
          const phoneNumberPartOne = representativeInfo.phone.slice(4, 7);
          const phoneNumberPartTwo = representativeInfo.phone.slice(7);

          const phoneFormated = `(${phoneOperator}) ${phoneNumberPartOne}-${phoneNumberPartTwo}`;

          setData({ ...representativeInfo, phone: phoneFormated });
        }
      } finally {
        setPendingData(false);
      }
    };

    getInfo();
  }, [identification]);

  if(roleUser !== USERS_ROLES.DIRECTOR && roleUser !== USERS_ROLES.TEACHER) return redirect('/home')

  return (
    <>
      <section className="flex flex-col gap-4">
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="p-5 flex flex-col justify-center gap-2 bg-white rounded-xl border border-black/5 shadow-sm flex-1">
            <div className="flex flex-col md:flex-row gap-4">
              <span className="flex gap-2 p-2 border border-gray-400 border-dashed rounded-lg items-center justify-between flex-1">
                <div className="flex flex-1 gap-2 items-center">
                  <IconId className="w-8 h-8 stroke-gray-500" />
                  {pendingData === false && `${data?.identification}`}
                  {pendingData === true && <TextSkeleton h="27px" />}
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
                  {pendingData === false && <>{data?.gender === GENDERS.MALE ? <IconGenderMale className="w-8 h-8 stroke-gray-500" /> : <IconGenderFemale className="w-8 h-8 stroke-gray-500" />} {data?.gender}</>}
                  {pendingData === true && <TextSkeleton h="27px" />}
                </div>
              </span>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <span className="flex gap-2 p-2 border border-gray-400 border-dashed rounded-lg items-center justify-between flex-1">
                <div className="flex flex-1 gap-2 items-center">
                  <IconPhone className="w-8 h-8 stroke-gray-500" />
                  {pendingData === false && `${data?.phone}`}
                  {pendingData === true && <TextSkeleton h="27px" />}
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
                  {pendingData === false && `${data?.email}`}
                  {pendingData === true && <TextSkeleton h="27px" />}
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
                  {pendingData === false && `${data?.adress}`}
                  {pendingData === true && <TextSkeleton h="27px" />}
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
                {pendingData === false && `${data?.fullName}`}
                {pendingData === true && <TextSkeleton h="28px" />}
              </span>
            </h1>

            {pendingData === false && (
              <span
                className={`w-full  text-center p-2 rounded-lg font-semibold ${
                  data?.status === REPRESENTATIVES_STATUS.SOLVENT
                    ? "bg-green-200 border-green-800 text-green-800"
                    : "bg-red-200 border-red-800 text-red-800"
                } border-2 border-dashed`}
              >
                {data?.status}
              </span>
            )}
            {pendingData === true && <TextSkeleton h="43.2px" />}
          </div>
        </div>

        <div className="h-full px-5 py-0 md:py-5 md:px-0 flex flex-col md:flex-row bg-white rounded-xl border border-black/5 shadow-sm">
          <div className="px-0 py-5 md:py-0 md:px-5 flex flex-col flex-1 border-b md:border-b-0 md:border-r border-dashed border-gray-400">
            <h2 className="text-xl font-bold uppercase">Estudiantes</h2>
            <span className="text-gray-500 text-lg">
              No posee estudiantes registrados
            </span>
          </div>

          <div className="px-0 py-5 md:py-0 md:px-5 max-w-96 w-full">
            <h2 className="text-xl font-bold uppercase">
              Ultimos pagos realizados
            </h2>
            <span className="text-gray-500 text-lg">
              No posee pagos realizados
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
