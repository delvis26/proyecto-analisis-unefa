"use client";

import UserContext from "@/store/user-context";
import { Toaster } from "sonner";

interface User {
  id?: string;
  fullName?: string;
  roleUser?: string;
  identification?: string;
  exp?: number;
  iat?: number;
}

export function App({
  children,
  userSession,
}: {
  children: React.ReactNode;
  userSession: User;
}) {
  return (
    <UserContext.Provider value={userSession}>
      {children}
      <Toaster richColors position="bottom-right" closeButton />
    </UserContext.Provider>
  );
}
