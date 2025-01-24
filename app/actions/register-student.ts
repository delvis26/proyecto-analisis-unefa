"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function RegsiterStudent(formData: FormData) {
  const data = Object.fromEntries(formData);

  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  if(!token) return redirect("/")

  try {
    const res = await fetch(`${process.env.URL_API}/api/register-student`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });

    const { error } = await res.json();

    if (error) {
      console.log(error)
      return {
        error: error,
      };
    }
      
  } catch (error) {
    console.log(error);
  }
}
