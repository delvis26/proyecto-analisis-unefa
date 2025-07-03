"use client"
import { Page, Text, View, Document, StyleSheet, Image, PDFViewer } from "@react-pdf/renderer"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

const styles = StyleSheet.create({
    page: { flexDirection: "column", backgroundColor: "#fff" },
    section: { margin: 10, padding: 10, flexGrow: 1 },
})

const DocumentComponent = ({ fullName, payRef, date, total, description, identificacion }: { fullName: string, payRef: string, date: string, total: string, description: string, identificacion: string }) => {
    return <Document>
        <Page size="A4" style={styles.page}>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center", alignSelf: "flex-start", padding: 20, width: '100%' }}>
            <Image src="/insignia.png" style={{ width: 70, height: 'auto' }} />
            <Text style={{ fontWeight: 800 }}>RECIBO DE PAGO</Text>
        </View>

        <View style={{ flexDirection: "column", padding: 20 }}>
            <Text style={{ fontWeight: 600, fontSize: 15 }}>{fullName}</Text>
            <Text style={{ fontWeight: 600, fontSize: 15 }}>Identificación: <Text style={{ fontWeight: 500 }}>{identificacion}</Text></Text>
            <Text style={{ fontWeight: 600, fontSize: 15 }}>Referencia de pago: <Text style={{ fontWeight: 500 }}>{payRef}</Text></Text>
            <Text style={{ fontWeight: 600, fontSize: 15 }}>Fecha: <Text style={{ fontWeight: 500 }}>{date}</Text></Text>
    
        </View>

        <View style={{ margin: 20, flexDirection: "row", justifyContent: "space-between", padding: 20, borderTop: "1px solid #000" , borderBottom: "1px solid #000" }}>
            <Text>{description}</Text>
            <Text>{total} Bs</Text>
        </View>
        </Page>
    </Document>
}

const PDF = () => {
    const params = useSearchParams()
    const fullName = params.get("fullName") as string
    const ref = params.get("ref") as string
    const date = params.get("date") as string
    const total = params.get("total") as string
    const description = params.get("description") as string
    const identificacion = params.get("identificacion") as string

    const _Date = new Date(date).toLocaleString('es-VE')

    return <Suspense fallback={null}>
        <PDFViewer style={{ width: "100%", height: "100vh" }}>
            <DocumentComponent fullName={fullName} payRef={ref} date={_Date} total={total} description={description} identificacion={identificacion} />
        </PDFViewer>
    </Suspense>
}

export default function PDFPage() { 
    return <PDF />
}