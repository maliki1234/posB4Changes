import  db  from "@/lib/db"
import { hash } from "bcrypt";

import { NextResponse } from "next/server";
import * as z from "zod";

const userSchema = z.object({
    firstName: z.string().min(2, {message: 'Please enter your last name'}),
    lastName: z.string().min(2, {message: 'Please enter your last name'}),
    phoneNumber: z.coerce.number(),
    password: z.string().min(2, {message: 'Please enter your password'}),
    
  })

export async function POST(req: Request) {
    try {

        const body = await req.json();
        const {phoneNumber ,firstName , lastName , password} =  userSchema.parse(body);
        
        const existingByPhoneNumber = await db.user.findUnique({
            where: {phoneNumber}
        })
        if (existingByPhoneNumber) {
            return NextResponse.json({user: null , message: 'User with this phone number  already exist'} , {status: 509})
        }

        const hashedPassword = await hash(password , 10)
        const newUser = await db.user.create({
            data:{
                firstName,
                lastName,
                phoneNumber,
                password: hashedPassword
            }
        })

        const {password: newUserPassword , ...rest} = newUser;


        return NextResponse.json({
            user: rest,
            message:"user created",
        },{status:200} )

    } catch (error) {
        return NextResponse.json({ message: error},{status:500})
    }
} 