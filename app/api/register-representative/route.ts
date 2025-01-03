import { db } from "@/db";
import { Users } from "@/db/schema";
import {
  API_ERRORS,
  MESSAGES,
  REPRESENTATIVES_STATUS,
  USERS_ROLES,
} from "@/lib/consts";
import { eq, or } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface User {
  id?: string;
  username?: string;
  fullName?: string;
  roleUser?: string;
  exp?: number;
  iat?: number;
}

export async function POST(request: NextRequest) {
  const authorization = request.headers.get("Authorization");
  const token = authorization && authorization.split(" ")[1];

  if (!token) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const secret = process.env.SECRET_JWT_KEY as string;
    const userRequest = jwt.verify(token, secret) as User;

    if (userRequest.roleUser !== USERS_ROLES.DIRECTOR)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();

    const {
      name,
      middle_name,
      last_name,
      second_last_name,
      gender,
      nationality,
      identification_number,
      phone,
      email,
      adress,
    } = body;

    if (
      !name ||
      !middle_name ||
      !last_name ||
      !second_last_name ||
      !nationality ||
      !identification_number ||
      !phone ||
      !email ||
      !adress
    )
      return NextResponse.json({ error: "Bad request" }, { status: 400 });

    if(!gender) return NextResponse.json({ error: MESSAGES.ERROR_SELECTED_GENDER }, { status: 400 })

    const identification = `${nationality}${identification_number}`;

    const findRepresentative = await db
      .select()
      .from(Users)
      .where(
        or(
          eq(Users.identification, identification),
          eq(Users.email, email),
          eq(Users.phone, phone)
        )
      );

    if (findRepresentative.length > 0) {
      const representative = findRepresentative[0];

      if (representative.identification === identification)
        return NextResponse.json(
          {
            error: MESSAGES.REGISTERED_IDENTITY_CARD,
          },
          { status: 400 }
        );

      if (representative.phone === phone)
        return NextResponse.json(
          {
            error: MESSAGES.PHONE_NUMBER_IS_REGISTERED,
          },
          { status: 400 }
        );

      if (representative.email === email)
        return NextResponse.json(
          {
            error: MESSAGES.EMAIL_IS_REGISTERED,
          },
          { status: 400 }
        );
    }

    const userId = crypto.randomUUID();
    const fullName = `${name} ${middle_name} ${last_name} ${second_last_name}`;
    const hashedPassword = await bcrypt.hash(identification, 10);

    await db.insert(Users).values({
      id: userId,
      fullName: fullName,
      gender: gender,
      identification: identification,
      email: email,
      password: hashedPassword,
      adress: adress,
      phone: phone,
      roleUser: USERS_ROLES.REPRESENTATIVE,
      status: REPRESENTATIVES_STATUS.INSOLVENT,
    });
  } catch (e) {
    if (e.message === API_ERRORS.TOKEN_EXPIRED)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    console.log(e);

    return NextResponse.json({ error: MESSAGES.ERROR }, { status: 500 });
  }

  return NextResponse.json({ successful: MESSAGES.RECORD_ADDED_SUCCESSFULLY });
}
