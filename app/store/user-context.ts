'use client'

import { createContext } from "react";

interface User {
  id?: string;
  username?: string;
  fullName?: string;
  roleUser?: string;
  exp?: number;
  iat?: number;
}

const UserContext = createContext<User>({});

export default UserContext