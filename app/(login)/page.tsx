import FormLogin from "@/components/form-login";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Colegio Barquisimeto",
};

export default async function Login() {
  const cookieStore = await cookies()

  const token = cookieStore.get("access_token")

  if(token) return redirect('/home')

  return (
    <div className="w-full min-h-screen bg-gray-200 flex flex-col items-center justify-center px-5">
      <FormLogin />
    </div>
  );
}
