import  db  from "@/lib/db"
import { hash } from "bcrypt";

import { NextResponse } from "next/server";
import * as z from "zod";

// enum role {
//     SUPERVISOR: "SUPERVISOR",
//     EMPLOYEE : EMPLOYEE
//   }


const userSchema = z.object({
    firstName: z.string().min(2, {message: 'Please enter your last name'}),
    lastName: z.string().min(2, {message: 'Please enter your last name'}),
    role:z.enum(['SUPERVISOR','EMPLOYEE','ADMIN']).nullable(),
    phoneNumber: z.coerce.number(),
    password: z.string().min(2, {message: 'Please enter your password'}),
    
  })

export async function POST(req: Request) {
    try {

        const body = await req.json();
        const businsess = await db.businness.findFirst()

        if (!businsess) {
            return NextResponse.json({success: false , message: "please resgister a business name first"}, {status: 400})
        }

        const {phoneNumber ,firstName , lastName , password ,role} =  userSchema.parse(body);
        
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
                password: hashedPassword,
                BusinessId: businsess.id,
                role
            }
        })

        const {password: newUserPassword , ...rest} = newUser;


        return NextResponse.json({
            user: rest,
            message:"user created",
        },{status:200} )

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error},{status:500})
    }
} 