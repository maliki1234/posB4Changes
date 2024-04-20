import db from "@/lib/db";
import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse } from "next/server";

export async function DELETE(req:Request) {
    const url = req.url.split('/product/')[1];
   try {
    const product = await db.product.delete({
        where:{
        id: parseInt(url)
        }
    })
    if (!product) {
        return NextResponse.json({success: false, message:"failed to delete product"}, {status: 404,})

    }

    return NextResponse.json({success: true, message:"successful deleted"}, {status: 204,})

   } catch (error) {
    console.log(error.message)
    return NextResponse.json({success: false, message:error.message}, {status: 404,})
    
   }
}

export async function PUT(req:Request) {
 
    
   try {
    const url = req.url.split('/product/')[1];
    const body = await req.json()
    const {name , description , price ,state,  category } = body

    const cat = await db.category.findFirst({
        where:{
            name: category
        }
        
    })
    if(!cat){
     return NextResponse.json({success: false , message: 'please contact your it sup something is not right'}, {status: 400})       
    }
    // console.log( name)

    // return NextResponse.json({ success: true} , {status:200})
    const product = await db.product.update({
        where:{
        id: parseInt(url)
        }, data: {
             description:description , price : price, categoryId : cat.id, state
        }

    })
    if (!product) {
        return NextResponse.json({success: false, message:"failed to delete product"}, {status: 404,})

    }
    // console.log(product)11
    return NextResponse.json({success: true, message:"successful update"}, {status: 200,})

   } catch (error) {
    console.log( error)
    return NextResponse.json({success: false, message:error}, {status: 404,})
    
   }
}


