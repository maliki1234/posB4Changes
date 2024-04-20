"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { useGlobalProducContext } from '@/app/context/store';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Copy } from 'lucide-react';
import { Separator } from '../ui/separator';
import { useReactToPrint } from 'react-to-print';
// import { toast } from '../ui/use-toast';

export default function StockFooter({stk}) {
    // console.log(stk)
    // const toast = useToast()
    const { toast } = useToast()
    const componentRef = useRef();
    const router = useRouter()
    const [first, setfirst] = useState("")
    // const { product, setProduct } = useGlobalProducContext();
    const { data: session } = useSession(
      
    )

    const formatter = new Intl.NumberFormat('Tz', {
        style: 'currency',
        currency: 'tsh',
    })
    useEffect(() => {
if (stk ) {
    // console.log(stk)
//     // 
//     let sum = 0;
//     stk.forEach((el: { id: number,
//     name: string,
//     price: number,
//     quantity: number,
//     Stock ?: { pPrice: number } 
//   }) =>{
//     if (el.Stock) {
//     sum += el.purchasePrice 
//     }
// })
//     console.log(sum);
const sum = stk.reduce((acc , el) => acc + el.purchasePrice, 0);



     const total = formatter.format(sum)
     setfirst(total)
}
    }, [])



   
    return (
        <>

            <Card className='fixed w-full py-2 grid grid-cols-1 md:grid-cols-5 bottom-0'>
                <div className="col-span-3"></div>
                <div className="cols=-span-1">
                    <div className="grid px-2 py-1 gap-y-1 grid-cols-2">
                        <div className="uppercase font-bold text-base">
                            total
                        </div>
                        <div className="uppercase font-bold text-base">
                            {
                                first
                            }
                        </div>
                        {/* <div className="uppercase font-bold text-base">
                            discount
                        </div>
                        <div className="uppercase font-bold text-base">
                            0
                        </div> */}
                    </div>
                    <div className="px-2">

                        

                    </div>
                </div>
            </Card>
        </>

    )
}
