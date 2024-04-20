import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

    // console.log("activate")
    // console.log(req.url)
    const data  = req.url
    const split = data.split('/role/')[1]
    // console.log(split)

const user = await db.user.findUnique({
    where: {
        id: parseInt(split)
    }
})


if (user) {
    const roles = user.role.toString()



    if (roles=== "ADMIN") {
        return NextResponse.json({success: false , message: 'role cant be changed' },  {status: 400})
        
    }

    let update
   




    if (roles === 'SUPERVISOR') {
            update = await db.user.update({
            where: {
                id: parseInt(split)
            },data:{
                role: 'EMPLOYEE'
        }})
    
    }
    else{
        update = await db.user.update({
            where: {
                id: parseInt(split)
            },data:{
                role: 'SUPERVISOR'
        }})
    }
   
    if (update) {
        return NextResponse.json({message: `now ${user.firstName} is ${user.active? 'active' : 'not active'}`})
    }
}
    try {
        return NextResponse.json({messege:"ljfsdlkfjlsdk",status: 200})
    } catch (error) {
        
    }
}



export async function DELETE(req:Request) {
    const url = req.url.split('/role/')[1];
   try {
    const product = await db.user.delete({
        where:{
        id: parseInt(url)
        }
    })
    if (!product) {
        return NextResponse.json({success: false, message:"failed to delete product"}, {status: 404,})

    }

    return NextResponse.json({success: true, message:"successful deleted"}, {status: 204,})

   } catch (error) {
    return NextResponse.json({success: false, message:error}, {status: 404,})
    
   }
}