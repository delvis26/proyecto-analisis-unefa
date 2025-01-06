"use server";

import { cookies } from "next/headers";

export async function RegsiterStudent(formData: FormData) {
  const data = Object.fromEntries(formData);

  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  try {
    const res = await fetch(`${process.env.URL_API}/api/register-student`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });

    const { error } = await res.json();

    if (error)
      return {
        error: error,
      };
  } catch (error) {
    console.log(error);
  }
}
