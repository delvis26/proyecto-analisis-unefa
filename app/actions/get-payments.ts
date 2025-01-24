"use server"

import { db } from "@/db";
import { Payments } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GetPayments(userId: string) {
    const data = await db.select().from(Payments).where(eq(Payments.representativeId, userId))
 
    return data
}