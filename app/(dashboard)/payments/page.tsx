"use client";

import { IconCashRegister, IconSearch } from "@/components/icons";

export default function Payments() {
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
            <button className="flex justify-center items-center px-3 py-2 gap-2 bg-blue-600 hover:bg-blue-800 transition-colors rounded-lg shadow text-white text-nowrap">
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
    </>
  );
}
