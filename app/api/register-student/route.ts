import { STUDENTS_STATUS, USERS_ROLES } from "@/lib/consts";
import { NextRequest, NextResponse } from "next/server";
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
    
    if (userRequest.roleUser !== USERS_ROLES.REPRESENTATIVE)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { name, middle_name, last_name, second_last_name, gender, course } =
      body;

    const fullName = `${name} ${middle_name} ${last_name} ${second_last_name}`;

    return NextResponse.json({
      fullName,
      gender,
      course,
      status: STUDENTS_STATUS.PENDUNDER_REVIEW,
      representativeId: userRequest.id,
    });
  } catch(error) {

    console.log(error)
  }
}
