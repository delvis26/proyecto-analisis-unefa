import "@/globals.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { App } from "@/components/app";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

import type { Metadata } from "next"
 
interface User {
  id?: string;
  username?: string;
  fullName?: string;
  roleUser?: string;
  exp?: number;
  iat?: number;
}

export const metadata: Metadata = {
  title: 'Colegio Barquisimeto'
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  if (!token) return redirect("/");

  const secret = process.env.SECRET_JWT_KEY as string;
  const data = jwt.verify(token.value, secret) as User;
  return (
    <html lang="es">
      <body className="antialiased min-h-screen bg-[#f0f3f7] flex flex-row">
        <App userSession={data}>
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-y-auto h-screen">
            <Header />
            <main className="flex flex-col gap-5 p-4 md:p-10">{children}</main>
          </div>
        </App>
      </body>
    </html>
  );
}
