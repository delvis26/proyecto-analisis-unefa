"use client"

import HomeDirector from "@/components/director/home-director";
import { USERS_ROLES } from "@/lib/consts";
import UserContext from "@/store/user-context";
import { useContext } from "react";

export default function Home() {
  const { roleUser } = useContext(UserContext)

  return (
    <>
      {roleUser === USERS_ROLES.DIRECTOR && <HomeDirector />}
    </>
  );
}
