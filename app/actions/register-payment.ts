"use server";

import { db } from "@/db";
import { Payments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function RegisterPayment(formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  if (!token) return redirect("/");

  const data = Object.fromEntries(formData);

  const {
    concept_amount,
    student,
    phone,
    identification,
    bank,
    bank_reference,
    userId,
  } = data;

  if (
    !concept_amount ||
    !student ||
    !phone ||
    !identification ||
    !bank_reference ||
    !userId
  ) {
    return {
      error: "Faltan campos",
    };
  }

  if (!bank) {
    return {
      error: "Indique un banco",
    };
  }

  const payment = (await db.select().from(Payments).where(eq(Payments.bankReference, bank_reference.toString()))).at(0)
  
  if(payment !== undefined) {
    console.log("existe")
    return {
      error: "La referencia bancaria ya existe"
    }
  }
  

  const paymentId = crypto.randomUUID();
  const [concept, amount] = concept_amount.toString().split(" ");

  try {
    await db.insert(Payments).values({
      id: paymentId,
      amount: Number.parseFloat(amount),
      bank: bank.toString(),
      bankReference: bank_reference.toString(),
      concept: concept.toString(),
      identification: identification.toString(),
      phone: phone.toString(),
      studentId: student.toString(),
      representativeId: userId.toString(),
      createdAt: new Date().toISOString(),
      used: 0
    });
  } catch(error) {
    console.log(error)
    return {
      error: "Algo ha ido mal...",
    };
  }

  return {
    success: true,
  };
}
