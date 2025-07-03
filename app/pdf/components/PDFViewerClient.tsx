"use client"
import { PDFViewer } from "@react-pdf/renderer"
import { ReactNode } from "react"

interface PDFViewerClientProps {
  children: ReactNode
  style?: React.CSSProperties
}

export default function PDFViewerClient({ children, style }: PDFViewerClientProps) {
  return (
    <PDFViewer style={style}>
      {children}
    </PDFViewer>
  )
}
