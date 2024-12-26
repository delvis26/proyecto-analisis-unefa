import { IconSchool, IconUserScreen, IconUserExclamation, IconUserCheck } from "@/components/icons";

export default function HomeInfo() {
  return (
    <section className="grid md:grid-cols-4 gap-5">
      <article className="bg-blue-200 rounded-xl flex flex-col gap-2 items-center p-6 text-black/70">
        <header className="p-3 bg-blue-600 text-white rounded-full">
          <IconSchool className="w-14 h-14" />
        </header>
        <footer className="flex flex-col items-center text-lg">
          <h2>Estudiantes inscritos</h2>
          <span className="font-bold">150</span>
        </footer>
      </article>

      <article className="bg-orange-200 rounded-xl flex flex-col gap-2 items-center p-6 text-black/70">
        <header className="p-3 bg-orange-600 text-white rounded-full">
          <IconUserScreen className="w-14 h-14" />
        </header>
        <footer className="flex flex-col items-center text-lg">
          <h2>Docentes</h2>
          <span className="font-bold">50</span>
        </footer>
      </article>

      <article className="bg-green-200 rounded-xl flex flex-col items-center gap-2 p-6 text-black/70">
        <header className="p-3 bg-green-600 text-white rounded-full">
          <IconUserCheck className="w-14 h-14" />
        </header>
        <footer className="flex flex-col items-center text-lg">
          <h2>Representantes solventes</h2>
          <span className="font-bold">100</span>
        </footer>
      </article>

      <article className="bg-red-200 rounded-xl flex flex-col items-center gap-2 p-6 text-black/70">
        <header className="p-3 bg-red-600 text-white rounded-full">
          <IconUserExclamation className="w-14 h-14" />
        </header>
        <footer className="flex flex-col items-center text-lg">
          <h2>Representantes insolventes</h2>
          <span className="font-bold">50</span>
        </footer>
      </article>
    </section>
  );
}
