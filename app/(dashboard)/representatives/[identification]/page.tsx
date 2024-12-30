"use client"
import { useParams } from "next/navigation"

export default function Representative() {
    const { identification } = useParams()

    return <>
    {identification}
    </>
}