"use server"

import { db } from "@/db"
import { Payments, Users } from "@/db/schema"
import { eq } from "drizzle-orm"

export default async function GetGeneralPayments() {
    const data = await db.select().from(Users).innerJoin(Payments, eq(Users.id, Payments.representativeId))

    return data
}