"use client";

import { RegsiterStudent } from "@/actions/register-student";
import { GENDERS, YEARS_TO_STUDY } from "@/lib/consts";
import { FormEvent } from "react";

export default function StudensRepresentedAdd() {
  const handleRegisterStudent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const $form = event.currentTarget
    const formData = new FormData($form)

    try {
      const data = await RegsiterStudent(formData)
      
      if(data) {
        console.log(data)
      }
    } catch {

    }
  }

  return (
    <section className="bg-white rounded-xl p-5 border border-black/5 shadow-sm flex flex-col gap-5">
      <h1 className="text-center text-xl font-bold">REGISTRAR ESTUDIANTE</h1>
      <form onSubmit={handleRegisterStudent} className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <input
            required
            className="w-full px-3 py-3 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
            type="text"
            placeholder="Nombre"
            name="name"
          />
          <input
            required
            className="w-full px-3 py-3 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
            type="text"
            placeholder="Segundo nombre"
            name="middle_name"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            required
            className="w-full px-3 py-3 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
            type="text"
            placeholder="Apellido"
            name="last_name"
          />
          <input
            required
            className="w-full px-3 py-3 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
            type="text"
            placeholder="Segundo apellido"
            name="second_last_name"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            onChange={() => console.log("...")}
            name="gender"
            defaultValue="null"
            className="w-full px-3 py-3 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
          >
            <option value="null" disabled>
              Genero
            </option>
            <option value={GENDERS.MALE}>Masculino</option>
            <option value={GENDERS.FEMALE}>Femenino</option>
          </select>

          <select
            onChange={() => console.log("...")}
            name="course"
            defaultValue="null"
            className="w-full px-3 py-3 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
          >
            <option value="null" disabled>
              Año a iniciar
            </option>
            <option value={YEARS_TO_STUDY.FIRST_YEAR}>1er año</option>
            <option value={YEARS_TO_STUDY.SECOND_YEAR}>2do año</option>
            <option value={YEARS_TO_STUDY.THIRD_YEAR}>3er año</option>
            <option value={YEARS_TO_STUDY.FOURTH_YEAR}>4to año</option>
            <option value={YEARS_TO_STUDY.FIFTH_YEAR}>5to año</option>
          </select>
        </div>

        <button className="p-3 disabled:opacity-70 rounded-xl bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors duration-150 uppercase">
          Registrar
        </button>
      </form>
    </section>
  );
}
