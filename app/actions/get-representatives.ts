"use server";

import { db } from "@/db";
import { Users } from "@/db/schema";
import { USERS_ROLES } from "@/lib/consts";
import { eq, and, like, or, asc, count } from "drizzle-orm";

export async function GetRepresentatives(search: string, pageNumber: number) {
  const page = pageNumber * 10

  const dataCount = await db
    .select({ count: count() })
    .from(Users)
    .where(
      and(
        eq(Users.roleUser, USERS_ROLES.REPRESENTATIVE),
        or(
          like(Users.identification, `%${search}%`),
          like(Users.fullName, `%${search}%`)
        )
      )
    );

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
    .limit(10)
    .offset(page)
    .orderBy(asc(Users.identification));

  return {
    data: data.reverse(),
    count: dataCount.at(0)?.count
  }
}
