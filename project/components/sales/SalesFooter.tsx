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

export default function SalesFooter() {
    // const toast = useToast()
    const { toast } = useToast()
    const componentRef = useRef();
    const router = useRouter()
    const [first, setfirst] = useState<number>(0)
    const { product, setProduct } = useGlobalProducContext();
    const { data: session } = useSession(
        // {
        // required: true,
        // onUnauthenticated() {
        //   redirect('/api/auth/signin?calbackUrl=/client')
        // }

    // }
    )
    //   console.log(session)

    useEffect(() => {

        if (product) {
            const sum = product.reduce((accumulator, object) => {
                return accumulator + object.Total;
            }, 0);

            //   console.log( sum)
            setfirst(sum)
        }


    }, [product])


    const pay = async () => {
        product.forEach(async element => {
            // console.log(element)
            // console.log(e)
            element.user = parseInt(session.id)

            const response = await fetch('/api/sales', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(element)
            })
            if (response.ok) {
                // console.log(response)
                const b = await response.json()
                toast({
                    title: "congratulation",
                    description: `${b.message}`
                })
                setProduct([])
                // router.push('/auth/login')

            } else {
                // console.error("Registrantion failed")
                // console.log(response.json())
                const b = await response.json()
                console.log(b.message)
                toast({
                    variant: 'destructive',
                    title: "ooops",
                    description: `${b.message}`,
                })
            }
        });
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    return (
        <>

            <Card className='fixed w-11/12 py-2 grid grid-cols-1 md:grid-cols-5 bottom-0'>
                <div className="col-span-4"></div>
                <div className="cols=-span-1">
                    <div className="grid px-2 py-1 gap-y-1 grid-cols-2">
                        <div className="uppercase font-bold text-base">
                            total
                        </div>
                        <div className="uppercase font-bold text-base">
                            {first}
                        </div>
                        <div className="uppercase font-bold text-base">
                            discount
                        </div>
                        <div className="uppercase font-bold text-base">
                            0
                        </div>
                    </div>
                    <div className="px-2">

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button type='submit' onClick={() => pay()} className='w-full h-12'>pay now</Button>

                                {/* <Button variant="outline">Share</Button> */}
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                {/* <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader> */}
                                <div ref={componentRef} className="flex flex-col  w-full justify-center">
                                    <Label className="text-center uppercase py-3">{process.env.NEXT_PUBLIC_BRAND_NAME}</Label>

                                    <Separator />
                                    <div className="py-6"></div>
                                    {product.map(product => (
                                        <div className="grid py-3 grid-cols-2">
                                            <div className="flex justify-start">
                                                {product.name}
                                            </div>
                                            <div className="flex justify-end">
                                                {product.price}
                                            </div>
                                        </div>
                                    ))}
                                    <Separator />

                                    <div className="grid py-6 grid-cols-2">
                                        <div className="flex justify-start">
                                            {/* {product.name} */}
                                            Total
                                        </div>
                                        <div className="flex justify-end">
                                            {first}
                                        </div>
                                    </div>
                                    <div className="py-6 grid justify-center">
                                        <Label className='capitalize'>thank you for shoping</Label>
                                    </div>

                                </div>
                                <DialogFooter className="sm:justify-between">
                                    <DialogClose asChild>
                                        <Button type="button" variant="secondary">
                                            Close
                                        </Button>
                                    </DialogClose>
                                    <Button onClick={handlePrint} type="submit">print</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                    </div>
                </div>
            </Card>
        </>

    )
}
