"use client";

import { RegisterRepresentative } from "@/actions/register-representative";
import { GENDERS, MESSAGES, USERS_ROLES } from "@/lib/consts";
import UserContext from "@/store/user-context";
import { redirect } from "next/navigation";
import { FormEvent, useCallback, useContext, useRef, useState } from "react";
import { toast } from "sonner";

export default function AddRepresentative() {
  const [pending, setPeding] = useState(false);
  const [errorInputIdCard, setErrorInputIdCard] = useState(false);
  const [errorInputEmail, setErrorInputEmail] = useState(false);
  const [errorInputPhone, setErrorInputPhone] = useState(false);
  const [errorInputGender, setErrorInputGender] = useState(false);
  const prefixRef = useRef<HTMLSelectElement>(null);
  const [juridico, setJuridico] = useState(false)

  const handleInputIdCard = useCallback(() => {
    setErrorInputIdCard(false);
    
    if(prefixRef.current?.value === "J") {
      setJuridico(true)
    } else {
      setJuridico(false)
    }

  }, []);

  const handleInputEmail = useCallback(() => {
    setErrorInputEmail(false);
  }, []);

  const handleInputPhone = useCallback(() => {
    setErrorInputPhone(false);
  }, []);

  const handleInputGender = useCallback(() => {
    setErrorInputGender(false);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const $form = event.currentTarget;
    const formData = new FormData($form);

    setPeding(true);

    const toastId = toast.loading("Enviando datos...");

    try {
      const data = await RegisterRepresentative(formData);

      if (data?.error) {
        setPeding(false);

        if (data.error === MESSAGES.REGISTERED_IDENTITY_CARD)
          setErrorInputIdCard(true);
        if (data.error === MESSAGES.PHONE_NUMBER_IS_REGISTERED)
          setErrorInputPhone(true);
        if (data.error === MESSAGES.EMAIL_IS_REGISTERED)
          setErrorInputEmail(true);
        if (data.error === MESSAGES.ERROR_SELECTED_GENDER)
          setErrorInputGender(true);

        return toast.error(data.error, {
          id: toastId,
        });
      }

      toast.success(MESSAGES.RECORD_ADDED_SUCCESSFULLY, {
        id: toastId,
      });
      setPeding(false);
      $form.reset();
    } catch {
      setPeding(false);
      toast.error(MESSAGES.ERROR, {
        id: toastId,
      });
    }
  };

  const session = useContext(UserContext);

  if (session.roleUser !== USERS_ROLES.DIRECTOR) return redirect("/home");

  return (
    <section className="bg-white rounded-xl p-5 border border-black/5 shadow-sm flex flex-col gap-5">
      <h1 className="text-center text-xl font-bold">REGISTRAR REPRESENTANTE</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <input
            required
            className="w-full px-3 py-3 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
            type="text"
            placeholder={juridico ? "Nombre del responsable" : "Nombre"}
            name="name"
          />
          <input
            className="disabled:opacity-50 w-full px-3 py-3 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
            type="text"
            placeholder="Segundo nombre (opcional)"
            name="middle_name"
            disabled={juridico}
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            required
            className="disabled:opacity-50 w-full px-3 py-3 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
            type="text"
            placeholder="Apellido"
            name="last_name"
            disabled={juridico}
          />
          <input
            className="disabled:opacity-50 w-full px-3 py-3 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
            type="text"
            placeholder="Segundo apellido (opcional)"
            name="second_last_name"
            disabled={juridico}
          />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-3">
          <div
            className={`relative w-full border ${
              errorInputIdCard ? "border-red-500" : "border-black/20"
            } transition-shadow ring-blue-500/20 focus-within:ring-[3px] rounded-xl overflow-hidden`}
          >
            <div className="absolute inset-y-0 flex items-center">
              <select
                ref={prefixRef}
                onChange={handleInputIdCard}
                name="nationality"
                className="h-full outline-none px-3 border-r border-black/20 bg-transparent"
              >
                <option value="V">V</option>
                <option value="E">E</option>
                <option value="J">J</option>
              </select>
            </div>
            <input
              onChange={handleInputIdCard}
              required
              name="identification_number"
              className="w-full pl-16 pr-3 py-3 outline-none"
              type="text"
              placeholder="Identificación"
            />
          </div>
          <input
            onChange={handleInputPhone}
            required
            className={`w-full px-3 py-3 rounded-xl border ${
              errorInputPhone ? "border-red-500" : "border-black/20"
            } transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none`}
            type="text"
            placeholder="Telefono"
            name="phone"
          />

          <select
            disabled={juridico}
            onChange={handleInputGender}
            name="gender"
            defaultValue="null"
            className={`disabled:opacity-50 w-full px-3 py-3 rounded-xl border ${
              errorInputGender ? "border-red-500" : "border-black/20"
            } transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none`}
          >
            <option value="null" disabled>
              Genero
            </option>
            <option value={GENDERS.MALE}>Masculino</option>
            <option value={GENDERS.FEMALE}>Femenino</option>
          </select>
        </div>
        <input
          onChange={handleInputEmail}
          required
          className={`w-full px-3 py-3 rounded-xl border ${
            errorInputEmail ? "border-red-500" : "border-black/20"
          } transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none`}
          type="email"
          placeholder="Correo electronico"
          name="email"
        />
        <input
          required
          className="w-full px-3 py-3 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
          type="text"
          placeholder="Dirección"
          name="adress"
        />

        <button
          disabled={pending}
          className="p-3 disabled:opacity-70 rounded-xl bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors duration-150 uppercase"
        >
          Registrar
        </button>
      </form>
    </section>
  );
}
