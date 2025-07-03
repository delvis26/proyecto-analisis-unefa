import { MESSAGES, STUDENTS_STATUS, USERS_ROLES } from "@/lib/consts";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/db";
import { Students } from "@/db/schema";
import { eq } from "drizzle-orm";

interface User {
  id: string;
  username: string;
  fullName: string;
  roleUser: string;
  exp: number;
  iat: number;
}

export async function POST(request: NextRequest) {
  const authorization = request.headers.get("Authorization");
  const token = authorization && authorization.split(" ")[1];

  if (!token) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const secret = process.env.SECRET_JWT_KEY as string;
    const userRequest = jwt.verify(token, secret) as User;

    if (userRequest.roleUser !== USERS_ROLES.REPRESENTATIVE)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    console.log(body);
    const {
      name,
      middle_name,
      last_name,
      second_last_name,
      gender,
      course,
      nationality,
      identification_number,
    } = body;

    if (!name || !last_name) {
      return NextResponse.json({ error: "error..." }, { status: 400 });
    }

    if (!gender)
      return NextResponse.json(
        { error: MESSAGES.ERROR_SELECTED_GENDER },
        { status: 400 }
      );

    if (!course)
      return NextResponse.json(
        { error: MESSAGES.ERROR_SELECTED_COURSE },
        { status: 400 }
      );

    let identification = null;

    if (nationality && identification_number) {
      identification = `${nationality}${identification_number}`;
    }

    const fullName = `${name} ${middle_name === undefined ? "" : middle_name} ${last_name} ${second_last_name === undefined ? "" : second_last_name}`;
    const id = crypto.randomUUID();

    if (nationality && identification_number && identification !== null) {
      const findStudent = await db
        .select()
        .from(Students)
        .where(eq(Students.identification, identification as string));

        if(findStudent.length > 0) {
          return NextResponse.json({ error: "La cedula de identidad se encuentra registrada" })
        }
    }

    await db.insert(Students).values({
      id,
      fullName,
      identification: identification,
      gender,
      status: STUDENTS_STATUS.PENDUNDER_REVIEW,
      course,
      createdAt: new Date().toISOString(),
      representativeId: userRequest.id,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: "Algo ha ido mal..." });
  }

  return NextResponse.json({ successful: MESSAGES.RECORD_ADDED_SUCCESSFULLY });
}
