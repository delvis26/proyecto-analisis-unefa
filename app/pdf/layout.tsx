import "@/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'RECIBO DE PAGO'
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased m-0 p-0">
        {children}
      </body>
    </html>
  );
}