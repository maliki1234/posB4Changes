import db from "@/lib/db";
import { compare, hash } from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";

const formschema = z.object({
    password: z.string()
  })
  const formsSchema = z.object({
    password: z.string(),
    Repassword: z.string(),
  })
export async function POST(req:Request) {
    const url = req.url.split('/password/')[1]
    const body = await req.json()
    const {password } = formschema.parse(body)
    try {
        const user = await db.user.findFirst({
            where: {
                id: parseInt(url)
            }
        })
        if (!user) {
            return NextResponse.json({success: false, message: 'User not found'}, {status:404})
        }
        const passwords  = await compare(password, user.password)
        if (!passwords) {
            return NextResponse.json({success: false, message: 'incorect password'}, {status:404})
        }
        const updaterandom = await db.user.update({
            where: {
                id: parseInt(url)
            },data:{
                random: true
            }
        })
        if (!updaterandom) {
            return NextResponse.json({success: false, message: 'cannot create link'}, {status:404})
            
        }
     return  NextResponse.json({success: true , message: 'it matches'}, {status: 200})
    } catch (error) {
        
    }
}
export async function PUT(req:Request) {
    const url = req.url.split('/password/')[1]
    const body = await req.json()
    const {password } = formschema.parse(body)
    const hashedPassword = await hash(password , 10)
    try {
        const random = await db.user.findFirst({
            where: {
                random: true
            }
        })
        if (!random) {
            return NextResponse.json({success: false, message: 'wrong atempt'}, {status:404})

        }
        const user = await db.user.update({
            where: {
                id: parseInt(url)
            },
            data:{
                password: hashedPassword,
                random: false
            }
        })

        if (!user) {
            return NextResponse.json({success: false, message: 'User not found'}, {status:404})
        }
        

     return  NextResponse.json({success: true , message: 'successfull change password'}, {status: 200})
    } catch (error) {
        
    }
}