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

export default function ExpenditureFooter({pro}) {

    // console.log(pro)
    // const toast = useToast()
    const { toast } = useToast()
    const componentRef = useRef();
    const router = useRouter()
    const [first, setfirst] = useState<number>(0)
    const [profit, setprofit] = useState<number>(0)
    // const { product, setProduct } = useGlobalProducContext();
    const { data: session } = useSession(
     
    )
    

    useEffect(() => {

        
            const sum = pro.reduce((accumulator, object) => {
                return accumulator + object.price;
            }, 0);

            
            setfirst(sum)

            const totalProfit = pro.reduce((accumulator, object) => {
                return accumulator + object.profit;
            }, 0);

            
            setprofit(totalProfit)
        


    }, [pro])


   
    return (
        <>

            <Card className='absolute w-full py-2 grid grid-cols-1 md:grid-cols-5 bottom-0'>
                <div className="col-span-4"></div>
                <div className="cols=-span-1">
                    <div className="grid px-2 py-1 gap-y-1 grid-cols-2">
                        <div className="uppercase font-bold text-base">
                            total
                        </div>
                        <div className="uppercase font-bold text-base">
                            {first}
                        </div>
                        
                    </div>
                    <div className="px-2">

                    </div>
                </div>
            </Card>
        </>

    )
}
