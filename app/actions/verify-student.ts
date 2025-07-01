"use server"

import { db } from "@/db"
import { Students } from "@/db/schema"
import { STUDENTS_STATUS } from "@/lib/consts"
import { eq } from "drizzle-orm"

export default async function VerifyStudent(id: string) {
    try {
        const result = await db.update(Students).set({ status: STUDENTS_STATUS.VERIFIED }).where(eq(Students.id, id))

        if(result.rowsAffected) {
            return {
                success: "Estudiante verificado con exito"
            }
        }
    } catch {
        return {
            error: "Ha ocurrido un error"
        }
    }
}