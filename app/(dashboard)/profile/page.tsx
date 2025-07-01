"use client"

import { UpdatePassword } from "@/actions/update-password"
import { IconUserCircle, IconId, IconMail, IconMapPin, IconKeyFilled } from "@/components/icons"
import UserContext from "@/store/user-context"
import { FormEvent, useContext, useState } from "react"
import { toast } from "sonner"

export default function Profile() {
    const { fullName, identification, id } = useContext(UserContext)
    const [pending, setPending] = useState(false)

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        const formTarget = event.target as HTMLFormElement
        const formData = new FormData(formTarget)
        const password = formData.get("password") as string

        if(password && id) {
            setPending(true)
            const toastId = toast.loading("Enviando...")

            const result = await UpdatePassword(password, id)

            if(result?.success) {
                toast.success("Contraseña actualizada", {
                    id: toastId
                })

                setPending(false)
                formTarget.reset()
            } else {
                setPending(false)
                toast.error("Error al actualizar la contraseña", {
                    id: toastId
                })
            }
        }
    }

    return (
        <div className="p-5 w-full flex flex-col bg-white border-black/5 shadow-sm rounded-xl gap-3">
            <div className="flex flex-col items-center justify-center">
                <IconUserCircle className="text-gray-300 w-32" />
                <span className="text-xl uppercase font-bold">{fullName}</span>
            </div>
            <div className="flex flex-row gap-3">
                <div className="relative flex gap-2 p-2 border border-gray-400 border-dashed rounded-lg items-center flex-1 overflow-hidden">
                    <IconId className="w-8 h-8 opacity-50" />
                    {identification}
                </div>

                <div className="relative flex gap-2 p-2 border border-gray-400 border-dashed rounded-lg items-center flex-1 overflow-hidden">
                    <IconMail className="w-8 h-8 opacity-50" />
                    {identification}
                </div>
            </div>
            <div className="relative flex gap-2 p-2 border border-gray-400 border-dashed rounded-lg items-center flex-1 overflow-hidden">
                <IconMapPin className="w-8 h-8" />
                {identification}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-row w-full gap-3">
                <div className="relative flex rounded-lg items-center flex-1">
                    <IconKeyFilled className="absolute w-8 h-8 ml-2 opacity-50" />
                    <input disabled={pending} name="password" required type="password" placeholder="Contraseña" className="pl-12 pr-2 py-3 w-full outline-none border border-gray-400 rounded-lg" />
                </div>

                <button disabled={pending} className="p-3 disabled:opacity-70 rounded-xl bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors duration-150 uppercase flex-1">
                    Cambiar contraseña
                </button>
            </form>
        </div>
    )
}