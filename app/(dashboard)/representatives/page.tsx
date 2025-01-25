"use client";

import { GetRepresentatives } from "@/actions/get-representatives";
import RepresentativeItemList from "@/components/director/representative-item-list";
import { IconArrowNarrow, IconSearch, IconUsersPlus } from "@/components/icons";
import TextSkeleton from "@/components/skeleton";
import { USERS_ROLES } from "@/lib/consts";
import UserContext from "@/store/user-context";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface Representative {
  fullName: string;
  identification: string;
  status: string | null;
}

export default function Representatives() {
  const [representatives, setRepresentatives] = useState<Representative[]>([]);
  const [pending, setPending] = useState(true);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  const handleSetPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleNextPage = useCallback((nextPage: number) => {
    if(nextPage >= totalPages) return

    setCurrentPage(nextPage)
  }, [totalPages])

  const handlePreviousPage = useCallback((previousPage: number) => {
    if(previousPage < 0) return

    setCurrentPage(previousPage)
  }, [])

  useEffect(() => {
    const handlerTimeout = setTimeout(async () => {
      setPending(true);

      try {
        const { data, count } = await GetRepresentatives(search, currentPage);

        setRepresentatives(data);

        if (count !== undefined) {
          const calculatedTotalPages = Math.ceil(count / 10);
          setTotalPages(calculatedTotalPages);
        }
      } finally {
        setPending(false);
      }
    }, 500);

    return () => {
      clearTimeout(handlerTimeout);
    };
  }, [search, currentPage]);

  const session = useContext(UserContext);

  if (session.roleUser !== USERS_ROLES.DIRECTOR) return redirect("/home");

  return (
    <section className="bg-white rounded-xl p-4 border border-black/5 shadow-sm flex flex-col">
      <h1 className="text-center text-xl font-bold mb-4">REPRESENTANTES</h1>

      <div className="flex flex-row justify-between gap-4 mb-4">
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
          <div className="flex justify-center">Estado</div>
          <div className="flex justify-end">Acciones</div>
        </div>

        <div className="flex flex-col">
          {pending === false &&
            representatives.map(
              ({ identification, fullName, status }, index) => (
                <RepresentativeItemList
                  key={identification}
                  fullName={fullName}
                  identification={identification}
                  status={status}
                  index={index}
                  length={representatives.length - 1}
                />
              )
            )}
          {pending === false && representatives.length === 0 && (
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
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center border-t border-dashed border-gray-300 pt-3">
          <div className="flex flex-row gap-1">
            <button onClick={() => handlePreviousPage(currentPage - 1)} className="flex justify-center items-center rounded-lg border border-gray-300 p-0.5">
              <IconArrowNarrow className="w-7 h-7 opacity-80" />
            </button>

            <div className="flex flex-row gap-1 items-center justify-center">
              {Array.from({ length: totalPages }, (_, index) => {
                return (
                  <button
                    onClick={() => handleSetPage(index)}
                    className={`w-[33.6px] h-full rounded-lg transition-colors ${
                      currentPage === index ? "bg-black/10" : "hover:bg-black/5"
                    }`}
                    key={index}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            <button onClick={() => handleNextPage(currentPage + 1)} className="flex justify-center items-center rounded-lg border border-gray-300 p-0.5">
              <IconArrowNarrow className="w-7 h-7 opacity-80 rotate-180" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
