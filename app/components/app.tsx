"use client";

import UserContext from "@/store/user-context";

interface User {
  id?: string;
  username?: string;
  fullName?: string;
  roleUser?: string;
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
    <UserContext.Provider value={userSession}>{children}</UserContext.Provider>
  );
}
