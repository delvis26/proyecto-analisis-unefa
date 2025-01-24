"use client"

import GetStudent from "@/actions/get-student"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

interface Students {
    id: string;
    fullName: string;
    gender: string;
    status: string;
    course: string;
    createdAt: string;
    representativeId: string;
};

interface User {
    id: string;
    password: string;
    roleUser: string;
    fullName: string;
    gender: string;
    identification: string;
    email: string;
    phone: string;
    adress: string;
    status: string | null;
    createdAt: string;
  }

  interface DataItem {
    students: Students;
    users: User;
  }

export default function Student() {
    const params = useParams()
    const idParam = params.id as string

    const [students, setStudents] = useState<DataItem>()
    const [pending, setPending] = useState(true)
    
    useEffect(() => {
        const getData = async () => {
            const res = await GetStudent(idParam)
            console.log(res.at(0))

            if(res) {
                setStudents(res.at(0))
                setPending(false)
            }
        }

        getData()
    }, [])

    return <>
        <section className="flex flex-row gap-2">
            <div className="p-2 bg-white shadow flex-1 flex flex-col justify-center items-center">
                <h2 className="text-center text-xl font-bold mb-4">ESTUDIANTE</h2>
            </div>

            <div className="p-2 bg-white shadow flex flex-col justify-center items-center">
                <h2 className="text-center text-xl font-bold mb-4">REPRESENTANTE</h2>
            </div>            
        </section>
    </>
}
