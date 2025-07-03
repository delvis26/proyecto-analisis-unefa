"use client";

import GetGeneralPayments from "@/actions/get-general-payments";
import { IconFileTypePdf, IconSearch } from "@/components/icons";
import TextSkeleton from "@/components/skeleton";
import { ARRAY_CONCEPTS } from "@/lib/consts";
import { useEffect, useState } from "react";
import type { Payment, User } from "@/db/schema";

interface DataItem {
  payments: Payment;
  users: User;
}

export default function Payments() {
  const [pending, setPending] = useState(true);
  const [payments, setPayments] = useState<DataItem[]>([]);

  useEffect(() => {
    const getData = async () => {
      const resPayments = await GetGeneralPayments();
      if (resPayments) {
        setPayments(resPayments);
        setPending(false);
      }
    };

    getData();
  }, []);

  return (
    <>
      <section className="bg-white rounded-xl p-4 border border-black/5 shadow-sm flex flex-col">
        <h1 className="text-center text-xl font-bold mb-4">PAGOS</h1>

        <div className="flex flex-row justify-between gap-4 mb-4">
          <div>
            <form>
              <div className="relative">
                <div className="absolute inset-y-0 ps-3 pointer-events-none flex items-center">
                  <IconSearch className="w-6 h-6 opacity-30 select-none" />
                </div>
                <input
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
            <div>Concepto</div>
            <div>Monto</div>
            <div>Referencia</div>
            <div className="flex justify-end">Acciones</div>
          </div>

          {payments.length > 0 &&
            payments.map((item, index) => {
              return (
                <div
                  key={item.payments.id}
                  className={`flex flex-row items-center *:truncate *:flex-1 px-4 py-2 gap-2 ${
                    index !== payments.length - 1 && "border-b border-black/10"
                  }`}
                >
                  <div>{item.users.fullName}</div>
                  <div>{item.users.identification}</div>
                  <div>
                    {item.payments.concept === ARRAY_CONCEPTS[0].concept &&
                      ARRAY_CONCEPTS[0].label}
                    {item.payments.concept === ARRAY_CONCEPTS[1].concept &&
                      ARRAY_CONCEPTS[1].label}
                    {item.payments.concept === ARRAY_CONCEPTS[2].concept &&
                      ARRAY_CONCEPTS[2].label}
                    {item.payments.concept === ARRAY_CONCEPTS[3].concept &&
                      ARRAY_CONCEPTS[3].label}
                  </div>
                  <div>Bs. {item.payments.amount}</div>
                  <div>{item.payments.bankReference}</div>
                  <div className="flex justify-end">
                    <button
                      className="p-1 md:px-2 bg-red-600 hover:bg-red-800 transition-colors text-white rounded-lg shadow flex justify-center items-center gap-1"
                    >
                      <IconFileTypePdf className="w-6 h-6" />
                      <span className="hidden md:block">Recibo</span>
                    </button>
                  </div>
                </div>
              );
            })}

          {pending === false && payments.length === 0 && (
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
