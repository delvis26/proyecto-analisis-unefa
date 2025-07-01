"use server"

import { db } from "@/db";
import { Users } from "@/db/schema";
import bcrypt from "bcrypt"
import { eq } from "drizzle-orm";

export async function UpdatePassword(password: string, id: string) {
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const result = await db.update(Users).set({ password: hashedPassword }).where(eq(Users.id, id))

        if(result.rowsAffected) {
            return {
                success: "Contraseña actualizada con exito"
            }
        }
    } catch {
        return {
            error: "Error al actualizar la contraseña"
        }
    }  
}