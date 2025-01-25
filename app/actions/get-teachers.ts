"use server"

import { db } from "@/db"
import { Users } from "@/db/schema"
import { USERS_ROLES } from "@/lib/consts"
import { eq } from "drizzle-orm"

export default async function GetTeachers() {
    const data = await db.select().from(Users).where(eq(Users.roleUser, USERS_ROLES.TEACHER))
    return data
}