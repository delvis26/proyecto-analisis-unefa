"use client";

import { IconCashRegister, IconSearch } from "@/components/icons";
import { ARRAY_BANKS, ARRAY_CONCEPTS } from "@/lib/consts";
import { ChangeEvent, FormEvent, useCallback, useRef, useState } from "react";
import { toast } from "sonner";

export default function Payments() {
  const [pending, setPending] = useState(true);
  const dialogRef = useRef(null);

  const handleConceptChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const { currentTarget } = event;

      if (currentTarget.value !== null) setPending(false);
    },
    []
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Probando...")
  };

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
            <button
              popoverTarget="confirm-payment"
              className="flex justify-center items-center px-3 py-2 gap-2 bg-blue-600 hover:bg-blue-800 transition-colors rounded-lg shadow text-white text-nowrap"
            >
              <IconCashRegister className="w-6 h-6" />
              Registrar pago
            </button>
          </div>
        </div>

        <div className="flex flex-col text-sm md:text-base">
          <div className="flex flex-row *:truncate *:flex-1 px-4 py-2 gap-2 bg-black/5 font-semibold rounded-lg">
            <div>Nombre de estudiante</div>
            <div>Referencia bancaria</div>
            <div className="flex justify-center">Fecha</div>
            <div className="flex justify-end">Acciones</div>
          </div>
          <div className="flex py-2 justify-center items-center">
            Sin resultados
          </div>
        </div>
      </section>
      <dialog
        ref={dialogRef}
        className="fixed top-0 left-0 w-full h-full open:flex content-center justify-items-center bg-transparent z-50"
        id="confirm-payment"
        popover="auto"
      >
        <div className="p-5 w-full max-w-2xl flex flex-col justify-center gap-4">
          <div className="flex flex-col gap-4 justify-center items-center p-3.5 rounded-lg shadow-2xl z-10 bg-white">
            <h3 className="font-bold text-center w-full">REGISTRAR PAGO</h3>

            <div className="bg-black/5 p-3 w-full shadow text-sm flex flex-col gap-2 border-l-4 border-blue-600">
              <h4 className="font-semibold">PAGO MOVIL</h4>
              <span>Número de telefono: 0400-000000</span>
              <span>RIF: J00000000</span>
              <span>Banco: Banco de Venezuela</span>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full"
            >
              <div>
                <select
                  onChange={handleConceptChange}
                  name="concept"
                  defaultValue="null"
                  className="w-full px-3 py-3 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
                >
                  <option value="null" disabled>
                    Seleccione un concepto de pago
                  </option>
                  {ARRAY_CONCEPTS.map(({ concept, amount }) => (
                    <option key={concept} value={concept}>
                      {concept + " (" + amount + " Bs" + ")"}
                    </option>
                  ))}
                </select>
                <span></span>
              </div>

              <input
                disabled={pending}
                type="text"
                placeholder="Número de teléfono"
                className="w-full px-3 py-3 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
              />

              <input
                disabled={pending}
                type="text"
                placeholder="Cédula de identidad"
                className="w-full px-3 py-3 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
              />

              <select
                disabled={pending}
                onChange={() => console.log("...")}
                name="bank"
                defaultValue="null"
                className="w-full px-3 py-3 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
              >
                <option value="null" disabled>
                  Banco
                </option>
                {ARRAY_BANKS.map(({ name }) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>

              <input
                disabled={pending}
                type="text"
                placeholder="Referencia bancaria"
                className="w-full px-3 py-3 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
              />

              <button
                disabled={pending}
                className="p-3 disabled:pointer-events-none disabled:opacity-70 rounded-xl bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors duration-150 uppercase"
              >
                Registrar
              </button>
            </form>
          </div>
        </div>

        <button
          popoverTarget="confirm-payment"
          popoverTargetAction="hide"
          className="bg-black/40 w-full h-full fixed top-0 left-0 cursor-default -z-50"
        ></button>
      </dialog>
    </>
  );
}
