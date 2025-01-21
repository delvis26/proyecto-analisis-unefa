'use client'

import { createContext } from "react";

interface User {
  id?: string;
  fullName?: string;
  roleUser?: string;
  identification?: string;
  exp?: number;
  iat?: number;
}

const UserContext = createContext<User>({});

export default UserContext