import { sqliteTable, text } from "drizzle-orm/sqlite-core"

export const Users = sqliteTable("users", {
    id: text("id").notNull().primaryKey().unique(),
    password: text("password").notNull(),
    roleUser: text("role_user").notNull(),
    fullName: text("full_name").notNull(),
    identification: text("identification").notNull(),
    email: text("email").notNull().unique(),
    phone: text("phone").notNull().unique(),
    adress: text("adress").notNull().unique(),
    status: text("status")
})