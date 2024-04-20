import db from "@/lib/db"
import { NextResponse } from "next/server"
import { z } from "zod"

const formSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.coerce.number(),
    // password: z.string().min(2, {message: 'Please enter your password'}),
  })
  


export async function PUT(req:Request) {
    
    const url = req.url.split('/update/')[1]
    // console.log(url)
     const body = await req.json()
    //  console.log(body)

    const { firstName, lastName, phoneNumber } =  formSchema.parse(body)
    // console.log(url)
    try {
        const product  = await db.user.update({
            where: {
                id: parseInt(url)
            },
            data:{
                firstName , lastName, phoneNumber
            }
        })
        if (!product) {
            return NextResponse.json({success: false, message: 'couldnt update your profile'}, {status: 400})
        }
        return NextResponse.json({success: true , message: "successfull update your profile"}, {status: 200})
    } catch (error) {
        return NextResponse.json({success: false, message:error}, {status: 400})
    }
}