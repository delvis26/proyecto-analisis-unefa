"use server";

import { db } from "@/db";
import { Students } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GetStudentsRepresented(userId: string) {
  if (!userId) return;

  const data = await db
    .select()
    .from(Students)
    .where(eq(Students.representativeId, userId));


  return data;
}
