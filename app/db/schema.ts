import { relations } from "drizzle-orm"
import { sqliteTable, text, numeric } from "drizzle-orm/sqlite-core"

export const Users = sqliteTable("users", {
    id: text("id").notNull().primaryKey().unique(),
    password: text("password").notNull(),
    roleUser: text("role_user").notNull(),
    fullName: text("full_name").notNull(),
    gender: text("gender").notNull(),
    identification: text("identification").notNull().unique(),
    email: text("email").notNull().unique(),
    phone: text("phone").notNull().unique(),
    adress: text("adress").notNull().unique(),
    status: text("status")
})

export const Students = sqliteTable("students", {
    id: text("id").notNull().primaryKey().unique(),
    fullName: text("full_name").notNull(),
    gender: text("gender").notNull(),
    status: text("status").notNull(),
    course: numeric("course").notNull(),
    representativeId: text("representative_id").notNull().references(() => Users.id)
})

export const parentRelation = relations(Users, ({ many }) => ({
    Students: many(Students)
}))

export const StudentParentRelation = relations(Students, ({ one }) => ({
    representative: one(Users, {
        fields: [Students.representativeId],
        references: [Users.id]
    })
}))