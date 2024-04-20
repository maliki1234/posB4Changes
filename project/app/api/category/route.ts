
import db from "@/lib/db"
import { NextResponse } from "next/server"





export async function POST(req:Request) {
    try {
 const data = await req.json()
 
 
 const category = await db.category.create({
     data:{
         name: data.name
     }
 })
 
 if (category) {
     return NextResponse.json({message: category}, {status:200})
 }
 
    } catch (error) {
 return NextResponse.json({message: "erro"},{status: 500})
     
    }
 }


export async function GET() {
    try {
        const category = await db.category.findMany()
        if (!category) {
            return NextResponse.json({ message: 'there are no user in the database' }, { status: 401 });
        }
        return NextResponse.json({ message: category }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 })
    }
}