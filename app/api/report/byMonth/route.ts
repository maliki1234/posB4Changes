import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req:Request) {
    try {
        const report = await db.report.groupBy({
          by:  ['month', 'year'],
          _sum:{
                price: true
          }}
        )
        if (!report) {
            return NextResponse.json({success: false} ,{status: 500})
        }
        return NextResponse.json({success: true , message: report}, {status: 200})
    } catch (error) {
        return NextResponse.json({success: false, message: error})
    }
}