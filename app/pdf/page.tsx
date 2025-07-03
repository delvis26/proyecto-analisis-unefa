"use client";
import { useSearchParams } from "next/navigation";
import { PDFViewer } from "@react-pdf/renderer";
import DocumentComponent from "@/components/recibo-pdf";


export default function PDFPage() {
  const params = useSearchParams();
  const fullName = params.get("fullName") as string;
  const ref = params.get("ref") as string;
  const date = params.get("date") as string;
  const total = params.get("total") as string;
  const description = params.get("description") as string;
  const identificacion = params.get("identificacion") as string;

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <DocumentComponent
        fullName={fullName}
        payRef={ref}
        date={date}
        total={total}
        description={description}
        identificacion={identificacion}
      />
    </PDFViewer>
  );
}
