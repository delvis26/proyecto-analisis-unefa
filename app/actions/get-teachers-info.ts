"use server";

import { db } from "@/db";
import { Users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GetTeachersInfo(identification: string) {
  const data = await db
    .select({
      id: Users.id,
      fullName: Users.fullName,
      gender: Users.gender,
      identification: Users.identification,
      email: Users.email,
      phone: Users.phone,
      status: Users.status,
      adress: Users.adress
    })
    .from(Users)
    .where(eq(Users.identification, identification));

  return data.at(0);
}
