import { create } from "zustand";

interface User {
    id?: string;
    username?: string;
    fullName?: string;
    roleUser?: string;
    exp?: number;
    iat?: number;
}

interface UserInfo {
    user: User
    setUser: (props: User) => void
}

export const userStore = create<UserInfo>((set) => ({
    user: {},
    setUser: (user) => set(() => ({
        user: user
    }))
}))