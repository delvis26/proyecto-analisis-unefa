"use client";

import { RegsiterStudent } from "@/actions/register-student";
import { GENDERS, MESSAGES, YEARS_TO_STUDY } from "@/lib/consts";
import { FormEvent, useCallback, useRef, useState } from "react";
import { toast } from "sonner";

export default function StudensRepresentedAdd() {
  const [errorInputIdCard, setErrorInputIdCard] = useState(false);
  const [errorInputGender, setErrorInputGender] = useState(false);
  const [errorInputCourse, setErrorInputCourse] = useState(false);
  const [hasId, setHasId] = useState(false);
  const [pending, setPending] = useState(false);

  const refIdentification = useRef(null);

  const handleInputIdCard = useCallback(() => {
    setErrorInputIdCard(false);
  }, []);

  const handleInputGender = useCallback(() => {
    setErrorInputGender(false);
  }, []);

  const handleInputCourse = useCallback(() => {
    setErrorInputCourse(false);
  }, []);

  const handleRegisterStudent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const $form = event.currentTarget;
    const formData = new FormData($form);

    setPending(true);
    const toastId = toast.loading("Enviando datos...");

    try {
      const data = await RegsiterStudent(formData);

      if (data?.error) {
        setPending(false);

        if (data.error === MESSAGES.ERROR_SELECTED_GENDER)
          setErrorInputGender(true);

        if (data.error === MESSAGES.ERROR_SELECTED_COURSE)
          setErrorInputCourse(true);

        return toast.error(data.error, {
          id: toastId,
        });
      }

      toast.success(MESSAGES.RECORD_ADDED_SUCCESSFULLY, {
        id: toastId,
      });

      setPending(false);

      $form.reset();
      setHasId(false)
    } catch {
      return toast.error("Algo ha ido mal", {
        id: toastId,
      });
    }
  };

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
            className="w-full px-3 py-3 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
            type="text"
            placeholder="Segundo nombre (opcional)"
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
            className="w-full px-3 py-3 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
            type="text"
            placeholder="Segundo apellido (opcional)"
            name="second_last_name"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            onChange={handleInputGender}
            name="gender"
            defaultValue="null"
            className={`w-full px-3 py-3 rounded-xl border ${
              errorInputGender ? "border-red-500" : "border-black/20"
            } transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none`}
          >
            <option value="null" disabled>
              Genero
            </option>
            <option value={GENDERS.MALE}>Masculino</option>
            <option value={GENDERS.FEMALE}>Femenino</option>
          </select>

          <select
            onChange={handleInputCourse}
            name="course"
            defaultValue="null"
            className={`w-full px-3 py-3 rounded-xl border ${
              errorInputCourse ? "border-red-500" : "border-black/20"
            } transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none`}
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

        <div className="flex items-center gap-3">
          <div className="flex gap-2 w-full">
            <input
              onChange={(event) => {
                setHasId(event.target.checked);

                if (refIdentification.current) {
                  (refIdentification.current as HTMLInputElement).value = "";
                }
              }}
              type="checkbox"
              className="w-5"
              id="has_id"
            />
            <label htmlFor="has_id" className="select-none">
              Posee cedula de identidad
            </label>
          </div>

          <div
            className={`relative w-full border ${
              errorInputIdCard ? "border-red-500" : "border-black/20"
            } transition-shadow ring-blue-500/20 focus-within:ring-[3px] rounded-xl overflow-hidden`}
          >
            <div className="absolute inset-y-0 flex items-center">
              <select
                disabled={!hasId}
                onChange={handleInputIdCard}
                name="nationality"
                className="h-full outline-none px-3 border-r border-black/20 bg-transparent"
              >
                <option value="V">V</option>
                <option value="E">E</option>
              </select>
            </div>
            <input
              ref={refIdentification}
              disabled={!hasId}
              onChange={handleInputIdCard}
              required
              name="identification_number"
              className="w-full pl-16 pr-3 py-3 outline-none"
              type="text"
              placeholder="Identificación"
            />
          </div>
        </div>

        <button
          disabled={pending}
          className={`p-3 disabled:opacity-70 rounded-xl bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors duration-150 uppercase ${
            pending && "opacity-50 pointer-events-none"
          }`}
        >
          Registrar
        </button>
      </form>
    </section>
  );
}
