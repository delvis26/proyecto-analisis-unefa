import { IconEye, IconSearch, IconUsersPlus } from "@/components/icons";
import Link from "next/link";

export default function Representatives() {
  return (
    <section className="bg-white rounded-xl p-4 border border-black/5 shadow-sm flex flex-col gap-4">
      <h1 className="text-center text-xl font-bold">REPRESENTANTES</h1>

      <div className="flex flex-row justify-between gap-4">
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

        <div>
          <Link className="flex justify-center items-center px-3 py-2 gap-2 bg-blue-600 hover:bg-blue-800 transition-colors rounded-lg shadow text-white text-nowrap" href="representatives/add">
            <IconUsersPlus className="w-6 h-6" />
            Registrar representante
          </Link>
        </div>

      </div>

      <div className="flex flex-col text-sm md:text-base">
        <div className="flex flex-row *:truncate *:flex-1 px-4 py-2 gap-2 bg-black/5 font-semibold rounded-lg">
          <div>Nombre completo</div>
          <div>Cedula</div>
          <div className="flex justify-center">Status</div>
          <div className="flex justify-end">Acciones</div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row items-center *:truncate *:flex-1 px-4 py-2 gap-2 border-b border-black/5">
            <div>Delvis Alexander Diaz Martos</div>
            <div>V30072431</div>
            <div className="flex justify-center bg-red-200 py-1 font-semibold text-red-600 rounded-lg text-xs md:text-base">
              Insolvente
            </div>
            <div className="flex justify-end">
              <Link
                className="p-1 md:px-2 bg-blue-600 hover:bg-blue-800 transition-colors text-white rounded-lg shadow flex justify-center items-center gap-1"
                href="#"
              >
                <IconEye className="w-6 h-6" />
                <span className="hidden md:block">Visualizar</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-row items-center *:truncate *:flex-1 px-4 py-2 gap-2 border-b border-black/5">
            <div>Juan Pedro Rodriguez Montes</div>
            <div>V30072431</div>
            <div className="text-center bg-green-200 py-1 font-semibold text-green-600 rounded-lg text-xs md:text-base">
              Solvente
            </div>
            <div className="flex justify-end">
              <Link
                className="p-1 md:px-2 bg-blue-600 hover:bg-blue-800 transition-colors text-white rounded-lg shadow flex justify-center items-center gap-1"
                href="#"
              >
                <IconEye className="w-6 h-6" />
                <span className="hidden md:block ">Visualizar</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
