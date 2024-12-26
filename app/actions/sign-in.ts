"use server";
import { cookies } from "next/headers";

export async function signIn(formData: FormData) {
  const cookieStore = await cookies();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const res = await fetch(`${process.env.URL_API}/api/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const { token, error } = await res.json();

    if(error) return {
      error: error
    }

    cookieStore.set("access_token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
    });
    

  } catch {
    return {
      error: "Algo ha ido mal..."
    }
  }
}
