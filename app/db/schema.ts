import { relations } from "drizzle-orm";
import { sqliteTable, text, numeric, real } from "drizzle-orm/sqlite-core";

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
  status: text("status"),
  createdAt: text("created_at").notNull(),
});

export const Students = sqliteTable("students", {
  id: text("id").notNull().primaryKey().unique(),
  fullName: text("full_name").notNull(),
  gender: text("gender").notNull(),
  status: text("status").notNull(),
  course: numeric("course").notNull(),
  createdAt: text("created_at").notNull(),
  representativeId: text("representative_id")
    .notNull()
    .references(() => Users.id),
});

export const Payments = sqliteTable("payments", {
  id: text("id").notNull().primaryKey().unique(),
  phone: text("phone").notNull(),
  bank: text("bank").notNull(),
  identification: text("identification").notNull(),
  bankReference: text("bank_reference").notNull().unique(),
  amount: real("amount").notNull(),
  concept: text("concept").notNull(),
  studentId: text("student_id").notNull().references(() => Students.id),
  representativeId: text("representative_id").notNull().references(() => Users.id),
  createdAt: text("created_at").notNull()
})

export const parentRelation = relations(Users, ({ many }) => ({
  Students: many(Students),
}));

export const StudentParentRelation = relations(Students, ({ one }) => ({
  representative: one(Users, {
    fields: [Students.representativeId],
    references: [Users.id],
  }),
}));

export const StudentPaymentRelation = relations(Students, ({ many }) => ({
  payments: many(Payments)
}))

export const PaymentStudentRelation = relations(Payments, ({ one }) => ({
  student: one(Students, {
    fields: [Payments.studentId],
    references: [Students.id]
  })
}))

export const UserPaymentRelation = relations(Users, ({ many }) => ({
  payments: many(Payments)
})) 

export const PaymentUserRelation = relations(Payments, ({ one }) => ({
  user: one(Users, {
    fields: [Payments.representativeId],
    references: [Users.id]
  })
}))