"use server"

import { db } from "@/db"
import { Students, Users } from "@/db/schema"
import { eq } from "drizzle-orm"

export default async function GetStudents() {
    const data = await db.select().from(Students).innerJoin(Users, eq(Users.id, Students.representativeId))
    return data
}