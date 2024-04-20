import db from "@/lib/db";
import { NextResponse } from "next/server"

export async function GET(req:Request) {
   try {
    const url = req.url.split("/stock/")[1];
    const product = await db.stock.findMany({
       where: {
        ProductId:parseInt(url) },include:{
            Product: true
        },
        orderBy: {
            createdAt: 'asc',
          },
    })
    if (!product) {
    return  NextResponse.json({success: false , message: 'no stock found for this product' }, {status: 200})
    }

return  NextResponse.json({success: true , message: product }, {status: 200})
   } catch (error) {
    return  NextResponse.json({success: false , message: error}, {status: 200})
    
   }
}

export async function DELETE(req:Request){
   try {
    const url = req.url.split("/stock/")[1];
    
    const stock = await db.stock.findFirst({
        where:{
            id: parseInt(url)
        }
    })

    console.log (stock)

    if (!stock) {
        return  NextResponse.json({success: false , message: 'no stock found for this product' }, {status: 400}) 
    }

    const product = await db.product.findFirst({
        where: {
            id: stock.ProductId
        }
    })


    console.log(product)


    if (!product) {
        return  NextResponse.json({success: false , message: 'no product found' }, {status: 400}) 
        
    }

    const updateproduct = await db.product.update({
        where:{
            id: stock.ProductId
        },
        data:{
            quantity: product.quantity - stock.remain
        }
    })

    if (!updateproduct) {
        return  NextResponse.json({success: false , message: 'sorry we cannot update product please contact your IT tech' }, {status: 400}) 
        
    }


    const deleteStock = await db.product.delete({
        where: {
            id: parseInt(url)
        }
    })

    if (!deleteStock) {
        return  NextResponse.json({success: false , message: 'sorry! we cannot delete this stock please contact your It tech' }, {status: 400}) 
        
    }


    return  NextResponse.json({success: true , message: 'success remove this sock' }, {status: 200})
 
   } catch (error) {
    return  NextResponse.json({success: false , message: 'no stock found for this product' }, {status: 400}) 
    
   }
}