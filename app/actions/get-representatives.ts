"use server";

import { db } from "@/db";
import { Users } from "@/db/schema";
import { USERS_ROLES } from "@/lib/consts";
import { eq, and, like, or } from "drizzle-orm";

export async function GetRepresentatives(search: string,) {
  const data = await db
    .select({
      fullName: Users.fullName,
      identification: Users.identification,
      status: Users.status,
    })
    .from(Users)
    .where(
      and(
        eq(Users.roleUser, USERS_ROLES.REPRESENTATIVE),
        or(
          like(Users.identification, `%${search}%`),
          like(Users.fullName, `%${search}%`)
        )
      )
    )
    .limit(10);

  return data.reverse();
}
