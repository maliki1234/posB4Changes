import db from "@/lib/db"
import { NextResponse } from "next/server"
export async function DELETE( req: Request) {
    try {


        // console.log('this is url')
        const url  =  req.url
        
        const splitedUrl = url.split('/category/')[1]
        // console.log(splitedUrl)
        const category = await db.category.delete(
            {
                where:{
                    id: parseInt(splitedUrl)
                }
            }
        )
        if (!category) {
            return NextResponse.json({ message: 'there are no user in the database' }, { status: 401 });
        }
        return NextResponse.json({ message: 'success deleted' }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 })
    }
}