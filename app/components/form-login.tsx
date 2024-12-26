"use client";

import { signIn } from "@/actions/sign-in";
import { IconMailFilled, IconKeyFilled } from "@/components/icons";
import { MESSAGES } from "@/lib/consts";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function FormLogin() {
    const [pending, setPeding] = useState(false)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setPeding(true)
        const toastId = toast.loading('Cargando...')
        
        try {
            const data = await signIn(formData);

            if(data?.error) {
                setPeding(false)

                return toast.error(data.error, {
                    id: toastId
                })
            }

            toast.success(MESSAGES.SUCCESSFUL, {
                id: toastId
            })

            setTimeout(() => {
                redirect('/home')
            }, 1000)
        } catch {
            setPeding(false)
            toast.error(MESSAGES.ERROR, {
                id: toastId
            })
        }
        
    }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto w-full flex flex-col gap-3 bg-white border border-black/20 p-5 rounded-[32px] shadow-sm"
    >
      <img
        className="self-center"
        width={200}
        src="/insignia.png"
        alt="Colegio Barquisimeto"
      />
      <div className="relative">
        <div className="absolute inset-y-0 ps-3 pointer-events-none flex items-center">
          <IconMailFilled className="w-6 h-6 opacity-30 select-none" />
        </div>
        <input
          required
          name="email"
          className="w-full pl-10 pr-3 py-3 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
          type="text"
          placeholder="Correo electronico"
        />
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 ps-3 pointer-events-none flex items-center">
          <IconKeyFilled className="w-6 h-6 opacity-30 select-none" />
        </div>
        <input
          required
          name="password"
          className="w-full pl-10 pr-3 py-3 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
          type="password"
          placeholder="Contraseña"
        />
      </div>
      <Link href="#" className="text-blue-600 font-semibold self-start">
        ¿Olvidaste tu contraseña?
      </Link> 
      <button disabled={pending} className="p-3 disabled:opacity-70 rounded-xl bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors duration-150">
        INGRESAR
      </button>
    </form>
  );
}
