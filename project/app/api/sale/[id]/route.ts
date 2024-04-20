import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
    const url  = req.url.split('/sale/')[1]

    const product = await db.product.findMany({
        where: {
            name: {
                startsWith: url
            }
        }
    })

    console.log( product)
    

    return NextResponse.json({message: product})
}