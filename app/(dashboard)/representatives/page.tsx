"use client";

import { GetRepresentatives } from "@/actions/get-representatives";
import RepresentativeItemList from "@/components/director/representative-item-list";
import { IconSearch, IconUsersPlus } from "@/components/icons";
import Spinner from "@/components/spinner";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

interface Representative {
  fullName: string;
  identification: string;
  status: string | null;
}

export default function Representatives() {
  const [representatives, setRepresentatives] = useState<Representative[]>([]);
  const [pending, setPending] = useState(true);
  const [search, setSearch] = useState<string>("");

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const handlerTimeout = setTimeout(async () => {
      setPending(true);

      try {
        const data = await GetRepresentatives(search);
        setRepresentatives(data);
      } finally {
        setPending(false);
      }
    }, 500);

    return () => {
      clearTimeout(handlerTimeout);
    };
  }, [search]);

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
                value={search}
                onChange={handleSearch}
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
            href="representatives/add"
          >
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
          {pending === false &&
            representatives.map(({ identification, fullName, status }, index) => (
              <RepresentativeItemList key={identification} fullName={fullName} identification={identification} status={status} index={index} length={representatives.length - 1} />
            ))}
          {pending === false && representatives.length === 0 && (
            <div className="flex py-2 justify-center items-center">
              Sin resultados
            </div>
          )}
          {pending && (
            <div className="my-2 flex justify-center items-center">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
