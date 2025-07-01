import { db } from "@/db";
import { Payments } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function getPayment(id: string) {
    try {
        const result = await db.select().from(Payments).where(eq(Payments.id, id))
        console.log(result)
        if (result.length === 0) {
            return null;
        }

        console.log("Pago encontrado:", result[0]);

        return result[0]
    } catch {
        return {
            error: "Error al obtener el pago"
        }
    }
}