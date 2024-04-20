'use client'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { compare } from 'bcrypt'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import CircleLoader from 'react-spinners/CircleLoader' 
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
// import { Button } from 'react-day-picker'

const FormSchema = z.object({
    name: z.string(),
    ExpiredateTime: z.coerce.number(),
    description: z.string(),
    productRemain:z.coerce.number(),
})

export default function page(prop: any) {
    // console.log(prop.params.business)
    const {toast} = useToast()
    
    const [company, setcompany] = useState()
    // console.log( company)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        // defaultValues:{
        //     name: company ? company.name : null
        // },
        values:{
            name: company?.name,
            ExpiredateTime: company?.expDateInfo,
            description: company?.description,
            productRemain: company?.productRemain,
        },
        
        
    })

    const getCopanyInfo = async()=>{
        console.log( "it should happen")
        const response = await fetch(process.env.NEXT_PUBLIC_URL +'api/business' , {
            method: 'GET',
            cache: 'no-store'
        })
        if (response.ok) {
            // console.log(response)
            const data = await response.json()
            // console.log(data.message)
            setcompany(data.message)

        }

    }

    useEffect(() => {
      getCopanyInfo()
    
    
    }, [])
    

    const onclick = async(e: z.infer<typeof FormSchema>)=>{
        // console.log(e)
        const response = await fetch(process.env.NEXT_PUBLIC_URL +'api/business',{
            method: 'PUT',
            headers: {
                'Content-Type': "application/json"
            },
            body:JSON.stringify(e)
        })
        if (response.ok) {
            toast({
                title: 'companny info successful updated',
                description:"please log out and lo in to see changes"

            })
        }
    }

  return (
    <>
    
    <h2 className='text-center py-4 text-3xl text-primary uppercase'>
        company customization
    </h2>

   <div className="px-4">
   {
    company?  <Form {...form}>
    <form onClick={form.handleSubmit(onclick)} className='flex flex-col gap-6'>
        <FormField 
        control={form.control}
        name="name"
        render={({ field }) => (
            <FormItem>
                <FormLabel>
                    company name
                </FormLabel>
                <FormControl>
                    <Input type='text' {...field} placeholder='edit bueiness profile name'/>
                </FormControl>
            </FormItem>
        )}
        />
        <FormField 
        control={form.control}
        name="description"
        render={({ field }) => (
            <FormItem>
                <FormLabel>
                    company information
                </FormLabel>
                <FormControl>
                    <Textarea {...field} placeholder='ie information about the company'/>
                </FormControl>
            </FormItem>
        )}
        />
        <FormField 
        control={form.control}
        name="ExpiredateTime"
        render={({ field }) => (
            <FormItem>
                <FormLabel>
                    expiredate time
                </FormLabel>
                <FormControl>
                    <Input type='number' {...field} placeholder='60'/>
                </FormControl>
            </FormItem>
        )}
        />
        <FormField 
        control={form.control}
        name="productRemain"
        render={({ field }) => (
            <FormItem>
                <FormLabel>
                    product quantity notification
                </FormLabel>
                <FormControl>
                    <Input type='number' {...field} placeholder='10'/>
                </FormControl>
            </FormItem>
        )}
        />
        <div className="flex items-left">
        <Button variant={"secondary"}  type='submit' > update now</Button>
        </div>
    </form>
</Form>:
<CircleLoader color='blue' size={70}/>

   }
   </div>
    </>
  )
}
