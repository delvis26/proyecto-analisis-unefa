import { db } from "@/db";
import { Users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password)
    return NextResponse.json({ error: "Bad request" }, { status: 400 });

  const data = await db.select().from(Users).where(eq(Users.email, email));
  const user = data.at(0);

  if(!user) return NextResponse.json({ error: "Usuario o contraseña incorrecta" }, { status: 400 })

  const isValid = await bcrypt.compare(password, user.password)

  if(!isValid) return NextResponse.json({ error: "Usuario o contraseña incorrecta" }, { status: 400 })

  const secret = process.env.SECRET_JWT_KEY as string

  const token = jwt.sign(
    {
      id: user.id,
      fullName: user.fullName,
      roleUser: user.roleUser,
      identification: user.identification
    },
    secret,
    {
      expiresIn: "1h",
    }
  );

  return NextResponse.json({ token }, {
    status: 200
  })
}
