"use server"

import { db } from "@/db"
import { Students, Users } from "@/db/schema"
import { eq } from "drizzle-orm"

export default async function GetStudent(id: string) {
    const data = await db.select().from(Students).where(eq(Students.id, id)).innerJoin(Users, eq(Users.id, Students.representativeId))

    console.log(data)
    return data
}