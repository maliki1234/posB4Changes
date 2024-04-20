import db from "@/lib/db";
import moment from "moment";
import { NextResponse } from "next/server";

export async function GET(res: Response) {
    var date = moment()
            .add(30,'d') //replace 2 with number of days you want to add
            .toDate(); //
    // console.log(date)

    var CurrentDate = moment().format();
    // console.log(CurrentDate)

    // const getExpire = await db.stock.groupBy({
    //     by: ['ProductId'],
    //         where: {
    //             quantity: {
    //                 gt: 0
    //             },
    //             expire:{
    //                 gt: CurrentDate,
    //                 lt: date
    //             }
    //         },
    //         _sum: {
    //             quantity: true
    //         },
            
        
    // })


    const getExpire = await db.stock.findMany({
       
            where: {
                quantity: {
                    gt: 0
                },
                expire:{
                    gte: CurrentDate,
                    lte: date
                }
            },include:{
                Product: {
                    select: {
                        name: true
                    }
                }
            }
         
        
    })

    // console.log(getExpire)

    if (!getExpire) {
        return NextResponse.json({success: false , message: "could not find the  expiration product"},{status: 300})
    }
   

    return NextResponse.json({success: true , message: getExpire},{status: 200})

}