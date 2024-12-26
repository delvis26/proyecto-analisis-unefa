import { db } from "@/db";
import { Users } from "@/db/schema";
import { MESSAGES, REPRESENTATIVES_STATUS, USERS_ROLES } from "@/lib/consts";
import { eq } from "drizzle-orm";
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
  const access_token = request.headers.get("access_token");

  if (!access_token)
    return NextResponse.json({ error: "Sin autorizacion" }, { status: 400 });

  const secret = process.env.SECRET_JWT_KEY as string;
  const userRequest = jwt.verify(access_token, secret) as User;

  if (userRequest.roleUser !== USERS_ROLES.DIRECTOR)
    return NextResponse.json({ error: "Sin autorizacion" }, { status: 400 });

  const body = await request.json();

  const {
    name,
    middleName,
    lastName,
    secondLastName,
    nationality,
    identificationNumber,
    phone,
    email,
    adress,
  } = body;

  if (
    !name ||
    !middleName ||
    !lastName ||
    !secondLastName ||
    !nationality ||
    !identificationNumber ||
    !phone ||
    !email ||
    !adress
  )
    return NextResponse.json({ error: "Bad request" }, { status: 400 });

  const identification = `${nationality}${identificationNumber}`;

  const findRepresentative = await db
    .select()
    .from(Users)
    .where(eq(Users.identification, identification));

  if (findRepresentative.length > 0) {
    const representative = findRepresentative[0];

    if (representative.identification)
      return NextResponse.json(
        {
          error: MESSAGES.REGISTERED_IDENTITY_CARD,
        },
        { status: 400 }
      );

    if (representative.email)
      return NextResponse.json(
        {
          error: MESSAGES.EMAIL_IS_REGISTERED,
        },
        { status: 400 }
      );

    if (representative.phone)
      return NextResponse.json(
        {
          error: MESSAGES.PHONE_NUMBER_IS_REGISTERED,
        },
        { status: 400 }
      );
  }

  const userId = crypto.randomUUID();
  const fullName = `${name} ${middleName} ${lastName} ${secondLastName}`;
  const hashedPassword = await bcrypt.hash(identification, 10);

  await db.insert(Users).values({
    id: userId,
    fullName: fullName,
    identification: identification,
    email: email,
    password: hashedPassword,
    adress: adress,
    phone: phone,
    roleUser: USERS_ROLES.REPRESENTATIVE,
    status: REPRESENTATIVES_STATUS.INSOLVENT,
  });

  return NextResponse.json({ successful: MESSAGES.RECORD_ADDED_SUCCESSFULLY });
}
